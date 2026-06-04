const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const { mentalHealthResponses } = require('./mentalHealthDataset');

// 1. Prepare training data
const categories = Object.keys(mentalHealthResponses).filter(k => k !== 'default');
const trainingData = [];
const labels = [];

categories.forEach((category, index) => {
  mentalHealthResponses[category].patterns.forEach(pattern => {
    trainingData.push(pattern);
    labels.push(index);
  });
});

// 2. Create vocabulary and tokenizer
const tokenize = text => text.toLowerCase().split(/\s+/);
const vocab = [...new Set(trainingData.flatMap(tokenize))];
const wordToIndex = Object.fromEntries(vocab.map((word, i) => [word, i]));

// Save vocabulary for later use
fs.writeFileSync('./vocab.json', JSON.stringify({ wordToIndex, categories }));

// 3. Convert text to numerical vectors
const encodeText = text => {
  const tokens = tokenize(text);
  const vector = new Array(vocab.length).fill(0);
  tokens.forEach(token => {
    if (wordToIndex[token] !== undefined) {
      vector[wordToIndex[token]] = 1;
    }
  });
  return vector;
};

// 4. Prepare tensors
const xTrain = tf.tensor2d(trainingData.map(encodeText));
const yTrain = tf.oneHot(tf.tensor1d(labels, 'int32'), categories.length);

// 5. Define model architecture
const model = tf.sequential();
model.add(tf.layers.dense({
  units: 32,
  activation: 'relu',
  inputShape: [vocab.length]
}));
model.add(tf.layers.dropout({ rate: 0.2 }));
model.add(tf.layers.dense({
  units: categories.length,
  activation: 'softmax'
}));

// 6. Compile the model
model.compile({
  optimizer: 'adam',
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy']
});

// 7. Train the model
async function trainModel() {
  console.log('Training model...');
  await model.fit(xTrain, yTrain, {
    epochs: 100,
    batchSize: 32,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}`);
      }
    }
  });
  
  // 8. Save the trained model
  await model.save('file://./trained_model');
  console.log('Model trained and saved!');
  
  // Clean up
  xTrain.dispose();
  yTrain.dispose();
}

trainModel();