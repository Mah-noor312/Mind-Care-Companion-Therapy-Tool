import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { getBotResponse } from './modelPredictor';

const Chatbot = () => {
  const [modelReady, setModelReady] = useState(false);
  
  useEffect(() => {
    async function initialize() {
      try {
        // Load the model when component mounts
        await tf.ready();
        await getBotResponse(''); // This will trigger model loading
        setModelReady(true);
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    }
    initialize();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const botResponse = await getBotResponse(input);
      setMessages(prev => [...prev, {
        text: botResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages(prev => [...prev, {
        text: "I'm having trouble understanding right now. Could you try again?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };
};