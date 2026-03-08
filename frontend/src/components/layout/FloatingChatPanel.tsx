import { useState, useEffect } from "react"
import { useSocket } from "../../hooks/socket"

import ChatMessages from "../chat/ChatMessages"
import ChatInput from "../chat/ChatInput"
import ParticipantList from "../participants/ParticipantList"

import type { ChatMessage } from "../../types/chat.types"
import type { Participant } from "../../types/session.types"

interface Props {
    open: boolean
    participants: Participant[] | []
    onKick?: (id: string) => void
}

function FloatingChatPanel({ open, participants, onKick }: Props) {

    const socket = useSocket()

    const [tab, setTab] = useState<"chat" | "participants">("chat")
    const [messages, setMessages] = useState<ChatMessage[]>([])

    useEffect(() => {

        if (!socket) return

        const handleNew = (msg: ChatMessage) => {
            setMessages((prev) => [...prev, msg])
        }

        socket.on("chat:new", handleNew)

        return () => {
            socket.off("chat:new", handleNew)
        }

    }, [socket])

    const sendMessage = (message: string) => {

        socket?.emit("chat:send", {
            senderName: "Teacher",
            senderRole: "TEACHER",
            message
        })

    }

    if (!open) return null

    return (

        <div
            style={{
                position: "fixed",
                right: "40px",
                bottom: "120px",
                width: "429px",
                height: "477px",
                background: "white",
                border: "1px solid #DFCCCC",
                borderRadius: "5px",
                boxShadow:
                    "-4px -4px 20px rgba(0,0,0,0.04), 4px 4px 20px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                zIndex: 1500
            }}
        >

            {/* Tabs */}

            <div
                style={{
                    display: "flex",
                    padding: "20px 20px 0",
                    fontFamily: "Sora"
                }}
            >

                <div
                    onClick={() => setTab("chat")}
                    style={{
                        fontWeight: tab === "chat" ? 600 : 400,
                        cursor: "pointer",
                        marginRight: "40px"
                    }}
                >
                    Chat
                </div>

                <div
                    onClick={() => setTab("participants")}
                    style={{
                        fontWeight: tab === "participants" ? 600 : 400,
                        cursor: "pointer"
                    }}
                >
                    Participants
                </div>

            </div>

            <div
                style={{
                    height: "4px",
                    width: tab === "chat" ? "99px" : "120px",
                    background: "#8F64E1",
                    marginLeft: "20px",
                    marginTop: "6px"
                }}
            />

            {tab === "chat" && (
                <>
                    <ChatMessages messages={messages} />
                    <ChatInput onSend={sendMessage} />
                </>
            )}

            {tab === "participants" && (
                <ParticipantList
                    participants={participants}
                    onKick={onKick}
                />
            )}

        </div>

    )
}

export default FloatingChatPanel