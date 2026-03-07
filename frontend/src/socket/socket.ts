import { io, Socket } from "socket.io-client"

const BACKEND_URL = import.meta.env.BACKEND_URL || "https://live-polling-backend-5bfy.onrender.com"

export const socket: Socket = io(BACKEND_URL, {
    autoConnect: false,
    transports: ["websocket"],
})