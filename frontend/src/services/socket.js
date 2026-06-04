import { io } from "socket.io-client";

// Create socket connection
export const socket = io("http://localhost:5005", {
  transports: ["websocket"], // Ensure using WebSocket over polling
  reconnectionAttempts: 5,    // Optional: Retry limit
  timeout: 10000              // Optional: Connection timeout
});

// Function to send a message to the bot
export const sendMessageToBot = (message, senderId = "user123") => {
  if (socket.connected) {
    socket.emit("user_uttered", {
      message,
      sender: senderId
    });
  } else {
    throw new Error("Socket is not connected");
  }
};

// Function to listen for bot replies and return an unsubscribe function
export const listenToBot = (callback) => {
  const handler = (data) => {
    console.log("🤖 Bot says:", data);
    // Normalize structure for the frontend
    callback({
      text: data.text || "🤖 ...",
      buttons: data.buttons || []
    });
  };

  socket.on("bot_uttered", handler);

  // Return cleanup function
  return () => {
    socket.off("bot_uttered", handler);
  };
};
