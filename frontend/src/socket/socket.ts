import { io, Socket } from "socket.io-client"

const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5000"

export const socket: Socket = io(BACKEND_URL, {
    transports: ["websocket"],
})