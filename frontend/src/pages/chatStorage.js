export const saveChat = (chat) => {
  localStorage.setItem('chat', JSON.stringify(chat));
};

export const loadChat = () => {
  const chat = localStorage.getItem('chat');
  return chat ? JSON.parse(chat) : [];
};

