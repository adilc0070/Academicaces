import { io } from "socket.io-client";



console.log(import.meta.env.VITE_BASE_URL);

export const initSocket = (userId: string) => {
    console.log(userId, "userId");
    const socket = io(import.meta.env.VITE_BASE_URL);
    socket.emit("join", { userId });
};