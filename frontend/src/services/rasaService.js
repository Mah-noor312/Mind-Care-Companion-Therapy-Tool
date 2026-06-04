// rasaService.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5005", {
  path: "/socket.io/",
  transports: ["websocket"],
});

export const sendMessage = (message, callback) => {
  socket.emit("user_uttered", {
    message: message,
    session_id: "custom_user_id_123", // You can generate a unique ID per user
  });

  socket.on("bot_uttered", (response) => {
    callback(response);
  });
};
