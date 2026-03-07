import { useEffect, useRef, useState } from "react"
import { useSocket } from "../../hooks/socket"

import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"
import type { ChatMessage } from "../../types/chat.types"

interface Props {
    senderName: string
    senderRole: "teacher" | "student"
    pollId?: string
}

function ChatPanel({ senderName, senderRole, pollId }: Props) {

    const socket = useSocket()

    const [messages, setMessages] = useState<ChatMessage[]>([])

    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        if (!socket) return

        const handleHistory = (data: ChatMessage[]) => {
            setMessages(data)
        }

        const handleNew = (msg: ChatMessage) => {

            setMessages(prev => {

                // prevent duplicate messages
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

    // auto scroll to newest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = (message: string) => {

        if (!socket) return

        socket.emit("chat:send", {
            senderName,
            senderRole: senderRole.toUpperCase(), // backend enum fix
            message,
            pollId: pollId ?? null
        })

    }

    return (

        <div
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "16px",
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >

            <h6 style={{ marginBottom: "10px" }}>
                Chat
            </h6>

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    marginBottom: "10px"
                }}
            >

                <ChatMessages messages={messages} />

                <div ref={bottomRef} />

            </div>

            <ChatInput onSend={sendMessage} />

        </div>

    )

}

export default ChatPanel