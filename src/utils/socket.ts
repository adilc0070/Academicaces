import { io } from "socket.io-client";

export const initSocket = (userId: string) => {
    console.log("Initializing socket for user:", userId);
    const socket = io(import.meta.env.VITE_BASE_URL);

    socket.on("connect", () => {
        console.log("Connected to socket server:", socket.id);
        socket.emit("join", { userId });
    });

    socket.on("newMessage", (message) => {
        console.log("New message received:", message);
    });

    socket.on("onlineStatus", (onlineUsers) => {
        console.log("Online users:", onlineUsers);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
    });

    return socket; // Return the socket instance
};
