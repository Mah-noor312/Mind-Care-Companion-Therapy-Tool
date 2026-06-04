import os
import json
import random
import nltk
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from nltk.stem import WordNetLemmatizer
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
import warnings

warnings.filterwarnings('ignore')
nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)

app = Flask(__name__)
CORS(app)

# Configuration
CONFIG = {
    "model_path": "model.pth",
    "batch_size": 64,
    "hidden_size": 64,
    "learning_rate": 0.001,
    "epochs": 100,
    "test_size": 0.2,
    "confidence_threshold": 0.5  # Lowered threshold for testing
}

# Load intents
try:
    with open("intents.json", "r", encoding='utf-8') as file:
        intents = json.load(file)
    print(f"✅ Loaded {len(intents['intents'])} intents.")
    # Print all available intents for debugging
    print("📋 Available intents:", [intent['tag'] for intent in intents['intents']])
except Exception as e:
    print(f"❌ Failed to load intents.json: {e}")
    intents = {"intents": []}

# Preprocessing helpers / initial containers
stemmer = WordNetLemmatizer()  # Initialize lemmatizer
ignore_words = {'?', '!', '.', ',', "'"}

words, classes, documents = [], [], []

# Preprocess intents into tokens, words, documents, classes
if 'intents' in intents: # Ensure 'intents' key exists
    for intent in intents['intents']: 
        tag = intent.get('tag')
        patterns = intent.get('patterns', [])
        if not tag or not patterns: 
            print(f"⚠️ Skipping invalid intent: {intent}")
            continue
        if tag not in classes:
            classes.append(tag) # Add to classes if new
        for pattern in patterns:
            try:
                tokens = nltk.word_tokenize(pattern.lower()) # Tokenize and lower
                tokens = [stemmer.lemmatize(w) for w in tokens if w not in ignore_words]
                words.extend(tokens)
                documents.append((tokens, tag))
            except Exception as e:
                print(f"⚠️ Failed to process pattern: {pattern} | Error: {e}")

words = sorted(set(words)) # Remove duplicates and sort
classes = sorted(set(classes)) 

print(f"📊 Vocabulary: {len(words)} words")
print(f"🏷️ Classes: {classes}")

# Model definition
class EnhancedNeuralNetwork(nn.Module): 
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__() 
        self.layers = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.BatchNorm1d(hidden_size),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(hidden_size, hidden_size),
            nn.BatchNorm1d(hidden_size),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(hidden_size, output_size),
            nn.Softmax(dim=1)
        )

    def forward(self, x):
        return self.layers(x) 

# Dataset creation
def create_training_data(): 
    if not documents:
        print("⚠️ No training data found.")
        return np.array([]), np.array([])
    
    X, y = [], []
    word_idx = {word: i for i, word in enumerate(words)}
    tag_idx = {tag: i for i, tag in enumerate(classes)}

    for tokens, tag in documents: 
        bow = np.zeros(len(words), dtype='float32')
        for word in tokens:
            if word in word_idx:
                bow[word_idx[word]] = 1.0
        label = np.zeros(len(classes), dtype='float32')
        label[tag_idx[tag]] = 1.0
        X.append(bow)
        y.append(label)

    return np.array(X), np.array(y)

class ChatDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.from_numpy(X).float() if len(X) else torch.empty(0)
        self.y = torch.from_numpy(y).float() if len(y) else torch.empty(0) 

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Model training
def train_model(): 
    print("🔁 Training model...")
    X, y = create_training_data()
    if not X.size or not y.size:
        print("❌ No training data to train.")
        return False

    try:
        train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=CONFIG['test_size'], random_state=42)
    except ValueError as e:
        print(f"❌ Split error: {e}")
        return False

    train_loader = DataLoader(ChatDataset(train_x, train_y), batch_size=CONFIG['batch_size'], shuffle=True)
    test_loader = DataLoader(ChatDataset(test_x, test_y), batch_size=CONFIG['batch_size'])
    model = EnhancedNeuralNetwork(len(words), CONFIG['hidden_size'], len(classes))
    criterion = nn.BCELoss()
    optimizer = optim.Adam(model.parameters(), lr=CONFIG['learning_rate'])
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, 'min', patience=5)
 
    best_acc = 0
    for epoch in range(CONFIG['epochs']):
        model.train()
        train_loss, train_acc = 0, 0

        for inputs, targets in train_loader:
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, targets)
            loss.backward()
            optimizer.step()

            train_loss += loss.item()
            train_acc += (outputs.argmax(1) == targets.argmax(1)).float().mean().item()

        model.eval()
        val_loss, val_acc = 0, 0
        with torch.no_grad():
            for inputs, targets in test_loader:
                outputs = model(inputs)
                val_loss += criterion(outputs, targets).item()
                val_acc += (outputs.argmax(1) == targets.argmax(1)).float().mean().item()

        train_loss /= len(train_loader)
        train_acc /= len(train_loader)
        val_loss /= len(test_loader)
        val_acc /= len(test_loader)

        scheduler.step(val_loss)

        print(f"Epoch {epoch+1}/{CONFIG['epochs']} | "
              f"Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f} | "
              f"Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.4f}")

        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(model.state_dict(), CONFIG['model_path'])

    print("✅ Training complete.")
    return True

# Load model or train
model = EnhancedNeuralNetwork(len(words), CONFIG['hidden_size'], len(classes))
if os.path.exists(CONFIG['model_path']):
    try:
        model.load_state_dict(torch.load(CONFIG['model_path']))
        print("✅ Loaded trained model.")
    except Exception as e:
        print(f"❌ Error loading model: {e} | Retraining...")
        if not train_model():
            print("❌ Failed to train model.")
else:
    print("⚠️ No model found. Training new model...")
    if not train_model():
        print("❌ Failed to train model.")

model.eval()

# Utility Functions
def get_response(tag):
    for intent in intents['intents']:
        if intent['tag'] == tag:
            response = random.choice(intent['responses'])
            follow_ups = intent.get('follow_ups', [])
            return response, follow_ups
    return "I'm not sure how to respond to that.", []

def predict_intent(sentence):
    if not words or not classes:
        print("❌ No words or classes available for prediction!")
        return "default", 0.0

    # Tokenize and lemmatize
    tokens = nltk.word_tokenize(sentence.lower())
    lemmatized_tokens = [stemmer.lemmatize(word) for word in tokens if word not in ignore_words]
    
    print(f"🔤 Input: '{sentence}'")
    print(f"🔡 Tokenized: {tokens}")
    print(f"📝 Lemmatized: {lemmatized_tokens}")
    
    # Create bag of words
    bow = np.zeros(len(words), dtype='float32')
    found_words = []
    for word in lemmatized_tokens:
        if word in words:
            bow[words.index(word)] = 1.0
            found_words.append(word)
    
    print(f"📊 Found words in vocabulary: {found_words}")
    print(f"🎯 Bag of words shape: {bow.shape}, Non-zero indices: {np.where(bow > 0)[0]}")
    
    # Predict
    input_tensor = torch.from_numpy(bow).float().unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
        probabilities = output.numpy()[0]
        prob, pred = torch.max(output, dim=1)
        predicted_class = classes[pred.item()]
        confidence = float(prob.item())
        
        # Print all probabilities for debugging
        print(f"🧠 Model output probabilities:")
        for i, class_name in enumerate(classes):
            print(f"   {class_name}: {probabilities[i]:.4f}")
        print(f"🎯 Final prediction: '{predicted_class}' with confidence: {confidence:.4f}")
        
        return predicted_class, confidence

def keyword_fallback(message):
    print("🔄 Trying keyword fallback...")
    tokens = {stemmer.lemmatize(word.lower()) for word in nltk.word_tokenize(message)}
    print(f"🔍 Fallback tokens: {tokens}")
    
    scores = [] 
    for intent in intents['intents']:
        match_score = 0
        for pattern in intent['patterns']:
            pattern_tokens = {stemmer.lemmatize(word.lower()) for word in nltk.word_tokenize(pattern)}
            common_words = tokens & pattern_tokens
            if common_words:
                match_score += len(common_words)
                print(f"   Pattern '{pattern}': {common_words} -> +{len(common_words)}")
        scores.append((intent['tag'], match_score))
        print(f"   Intent '{intent['tag']}': total score = {match_score}")

    scores.sort(key=lambda x: x[1], reverse=True)
    print(f"📈 Fallback scores: {scores}")
    
    if scores and scores[0][1] > 0:
        print(f"✅ Keyword fallback matched: {scores[0][0]}")
        return scores[0][0]
    
    print("❌ No keyword fallback match found")
    return None

# Enhanced chat route with comprehensive debugging
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '').strip().lower()
    is_typing = data.get('is_typing', False)

    print(f"\n" + "="*50)
    print(f"📨 NEW MESSAGE: '{message}'")
    print(f"="*50)

    if not message:
        return jsonify({'response': "Please type something.", 'follow_ups': [], 'intent_tag': 'default'})

    try:
        if is_typing:
            return jsonify({'response': "", 'follow_ups': [], 'intent_tag': 'typing'})

        # Emotional keyword detection
        emotional_states = {
            'sad': ['sad', 'depressed', 'unhappy', 'down', 'miserable', 'heartbroken'],
            'anxious': ['anxious', 'nervous', 'worried', 'stressed', 'panicked'],
            'angry': ['angry', 'mad', 'furious', 'annoyed', 'irritated']
        }

        detected_emotion = None
        for emotion, keywords in emotional_states.items():
            if any(word in message for word in keywords):
                detected_emotion = emotion
                break

        if detected_emotion:
            print(f"🎭 Emotion detected: {detected_emotion}")
            tag = detected_emotion
            confidence = 1.0
        else:
            print("🔍 No emotion detected, predicting intent...")
            tag, confidence = predict_intent(message)

        print(f"📊 Result: tag='{tag}', confidence={confidence:.4f}, threshold={CONFIG['confidence_threshold']}")

        # Check confidence threshold
        if confidence > CONFIG['confidence_threshold']:
            response, follow_ups = get_response(tag)
            print(f"✅ USING PREDICTED INTENT: {tag}")
            print(f"💬 Response: {response}")
            return jsonify({
                'response': response,
                'follow_ups': follow_ups,
                'intent_tag': tag
            })

        print(f"❌ Confidence too low, trying keyword fallback...")
        fallback_tag = keyword_fallback(message)
        if fallback_tag:
            response, follow_ups = get_response(fallback_tag)
            print(f"✅ USING KEYWORD FALLBACK: {fallback_tag}")
            print(f"💬 Response: {response}")
            return jsonify({
                'response': response,
                'follow_ups': follow_ups,
                'intent_tag': fallback_tag
            })

        # Default response
        response, follow_ups = get_response('default')
        print(f"🚨 USING DEFAULT RESPONSE")
        print(f"💬 Response: {response}")
        return jsonify({
            'response': response,
            'follow_ups': follow_ups,
            'intent_tag': 'default'
        })

    except Exception as e:
        print(f"💥 ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({ 
            'response': f"An error occurred: {str(e)}",
            'follow_ups': [],
            'intent_tag': 'error'
        }), 500

# Follow-up route
@app.route('/chat/followup', methods=['POST'])
def followup(): 
    data = request.get_json()
    message = data.get('message', '').strip().lower() 
    intent_tag = data.get('intent_tag', '') 
    follow_up_chain = data.get('follow_up_chain', [])

    print("🛎️ Follow-up request received:")
    print("   Text:", message)
    print("   Intent tag:", intent_tag)
    print("   Chain:", follow_up_chain)

    if not message or not intent_tag:
        return jsonify({
            'response': "Sorry, something went wrong.",
            'follow_ups': [],
            'intent_tag': intent_tag
        })

    try:
        for intent in intents['intents']:
            if intent['tag'] == intent_tag:
                node = followup_from_chain(intent.get('follow_ups', []), follow_up_chain[:-1])
                match = find_followup_response(node.get('follow_ups', []), message)
                if match:
                    print("✅ Match found:", match.get('text'))
                    return jsonify({
                        'response': match.get('response', "I'm not sure how to respond to that."),
                        'follow_ups': match.get('follow_ups', []),
                        'intent_tag': intent_tag
                    })

        print("❌ No match found in follow-ups.")
        return jsonify({
            'response': "I'm not sure how to respond to that.",
            'follow_ups': [],
            'intent_tag': intent_tag
        })

    except Exception as e:
        return jsonify({
            'response': f"An error occurred while processing the follow-up: {str(e)}",
            'follow_ups': [],
            'intent_tag': intent_tag
        }), 500

# Recursive helpers
def find_followup_response(follow_ups, message_text):
    for follow_up in follow_ups or []:
        if isinstance(follow_up, dict):
            current_text = follow_up.get('text', '').strip().lower()
            print("🔍 Checking:", current_text)
            if current_text == message_text:
                return follow_up
    return None

def followup_from_chain(follow_ups, chain):
    if not follow_ups or not chain:
        return {'follow_ups': follow_ups or []}
    current_text = chain[0].strip().lower()
    for follow_up in follow_ups:
        if follow_up.get('text', '').strip().lower() == current_text:
            return followup_from_chain(follow_up.get('follow_ups', []), chain[1:])
    return {'follow_ups': follow_ups or []}

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'intents_count': len(intents['intents']),
        'words_count': len(words),
        'classes_count': len(classes),
        'classes': classes
    })

if __name__ == '__main__':
    print("\n🚀 Starting Python Chatbot Server...")
    print(f"📊 Loaded {len(words)} words, {len(classes)} classes, {len(documents)} training patterns")
    app.run(debug=True, port=5001)