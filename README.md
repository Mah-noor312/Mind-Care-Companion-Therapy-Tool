# 🧠 Mind Care Companion – AI Therapy & Emotion Support System

Mind Care Companion is an AI-powered mental health support system designed to detect user emotions and provide appropriate responses, recommendations, and escalation support. It combines **Machine Learning models, Deep Learning (FFNN), and Large Language Models (LLMs)** to simulate a conversational therapy assistant.

---

## 🚀 Project Overview

The system analyzes user text input in real time to detect emotional states such as:

- 😔 Depression (mild / severe / suicidal)
- 😡 Anger
- 😟 Stress
- 🙂 Neutral / Normal state

Based on detection results, the system provides:
- AI-generated therapeutic responses (LLM-based)
- Coping exercises and mental wellness tips
- Doctor consultation suggestions (location-based)
- Emergency helpline support for critical cases

---

## 🧠 AI & Machine Learning Architecture

### 1. 🧬 Feed Forward Neural Network (FFNN)
- Primary emotion classification model
- Trained on labeled text dataset
- Converts text features into emotion predictions
- Outputs probability scores for each category:
  - Depression
  - Stress
  - Anger
  - Neutral

---

### 2. 🤖 Large Language Model (LLM Integration)
- Used for generating human-like conversational responses
- Enhances user experience with empathetic replies
- Provides:
  - Therapy-style conversation
  - Emotional support messages
  - Guided coping strategies

LLM acts as a **response generator layer**, while FFNN acts as a **decision-making layer**.

---

### 3. 🔄 Hybrid AI Flow

```text id="fyp2"
User Input
   ↓
Text Preprocessing
   ↓
FFNN Emotion Detection Model
   ↓
Emotion Classification Result
   ↓
Decision Engine:
   ├── Normal → LLM supportive chat + tips
   ├── Stress/Anger → coping exercises + suggestions
   ├── Depression → doctor recommendation system
   └── Suicidal → emergency helpline escalation
   ↓
LLM Response Generator
   ↓
Final Output to User
``` id="fyp3"

---

## 🏗️ System Features

### 💬 Conversational AI
- Chat-based interface (no fixed options)
- Natural language interaction
- Context-aware responses using LLM

### 🧠 Emotion Detection
- FFNN-based classification model
- Real-time sentiment analysis
- Multi-class emotion detection

### 🩺 Mental Health Support
- Exercise recommendations
- Stress relief techniques
- Depression awareness guidance

### 🚨 Crisis Handling
- Suicide risk detection
- Emergency helpline redirection
- Priority escalation system

### 🌍 Recommendation System
- Doctor suggestions based on user location
- Support resource mapping

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Bootstrap

### Backend
- Django (API layer)

### AI/ML
- Python
- FFNN (Neural Network model)
- NLP preprocessing (tokenization, embeddings)
- LLM integration (API-based or local model)

---

## 🔐 Safety Layer

- Rule-based safety filters for crisis detection
- LLM response moderation
- Escalation system for high-risk inputs

---

## 🎯 Goal of the Project

To build an intelligent mental health assistant that combines:
- Machine Learning (FFNN)
- Deep Learning
- Large Language Models (LLMs)

for providing scalable, accessible, and empathetic mental health support.

---

## 👩‍💻 Final Year Project

**Developed by:** BSCS Final Year Team  
**Domain:** Artificial Intelligence + Healthcare  
**Type:** Hybrid AI System (ML + LLM + Rule-based Engine)
