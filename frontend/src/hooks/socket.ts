import { useEffect } from "react"
import { socket } from "../socket/socket"

export function useSocket() {
    useEffect(() => {
        if (!socket.connected) {
            socket.connect()
        }

        return () => {
            // do not disconnect here (shared connection)
        }
    }, [])

    return socket
}