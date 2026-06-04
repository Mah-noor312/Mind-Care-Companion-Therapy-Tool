export const saveChatSession = (messages, sessionId = Date.now().toString()) => {
  if (!messages || messages.length === 0) return;
  
  try {
    const session = {
      id: sessionId,
      timestamp: new Date().toISOString(),
      messages: messages
    };
    
    const history = getChatHistory();
    // Update existing session or add new one
    const existingIndex = history.findIndex(s => s.id === sessionId);
    if (existingIndex >= 0) {
      history[existingIndex] = session;
    } else {
      history.unshift(session);
    }
    // Keep only the last 20 sessions
    const updatedHistory = history.slice(0, 20);
    localStorage.setItem('mindcare_chat_history', JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving chat session:', error);
  }
};

export const getChatHistory = () => {
  try {
    const history = localStorage.getItem('mindcare_chat_history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
};

export const clearChatHistory = () => {
  localStorage.removeItem('mindcare_chat_history');
};

export const deleteChatSession = (sessionId) => {
  const history = getChatHistory();
  const updatedHistory = history.filter(session => session.id !== sessionId);
  localStorage.setItem('mindcare_chat_history', JSON.stringify(updatedHistory));
};