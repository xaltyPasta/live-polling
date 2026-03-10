import { createContext, useContext, useEffect, useState } from "react"
import { useSocket } from "../hooks/socket"
import type { ChatMessage } from "../types/chat.types"

interface ChatContextType {
    messages: ChatMessage[]
    sendMessage: (
        senderName: string,
        senderRole: "TEACHER" | "STUDENT",
        message: string,
        pollId: string
    ) => void
    requestHistory: (pollId: string) => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: React.ReactNode }) {

    const socket = useSocket()
    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(() => {

        if (!socket) return

        const handleHistory = (data: ChatMessage[]) => {
            setMessages(data)
        }

        const handleNew = (msg: ChatMessage) => {

            setMessages(prev => {

                if (prev.some(m => m.id === msg.id)) {
                    return prev
                }

                return [...prev, msg]

            })

        }

        socket.on("chat:history", handleHistory)
        socket.on("chat:new", handleNew)

        return () => {
            socket.off("chat:history", handleHistory)
            socket.off("chat:new", handleNew)
        }

    }, [socket])

    const requestHistory = (pollId: string) => {

        if (!socket) return

        // ✅ Fixed event name: was "chat:get_history", matches backend listener
        socket.emit("chat:get_history", { pollId })

    }

    const sendMessage = (
        senderName: string,
        senderRole: "TEACHER" | "STUDENT",
        message: string,
        pollId: string
    ) => {

        if (!socket) return

        socket.emit("chat:send", {
            senderName,
            senderRole,
            message,
            pollId
        })

    }

    return (
        <ChatContext.Provider value={{ messages, sendMessage, requestHistory }}>
            {children}
        </ChatContext.Provider>
    )

}

export function useChat() {

    const ctx = useContext(ChatContext)

    if (!ctx) {
        throw new Error("useChat must be used inside ChatProvider")
    }

    return ctx

}