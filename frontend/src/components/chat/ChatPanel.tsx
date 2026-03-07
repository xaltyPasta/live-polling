import { useEffect, useState } from "react"
import { useSocket } from "../../hooks/socket"

import ChatMessages from ".//ChatMessages"
import ChatInput from "./ChatInput"
import type { ChatMessage } from "../../types/chat.types"

function ChatPanel() {
    const socket = useSocket()
    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(() => {
        socket.on("chat:history", (data: ChatMessage[]) => {
            setMessages(data)
        })

        socket.on("chat:new", (msg: ChatMessage) => {
            setMessages((prev) => [...prev, msg])
        })

        return () => {
            socket.off("chat:new")
            socket.off("chat:history")
        }
    }, [socket])

    const sendMessage = (message: string) => {
        socket.emit("chat:send", { message })
    }

    return (
        <div
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "16px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h6 style={{ marginBottom: "10px" }}>Chat</h6>

            <ChatMessages messages={messages} />

            <ChatInput onSend={sendMessage} />
        </div>
    )
}

export default ChatPanel