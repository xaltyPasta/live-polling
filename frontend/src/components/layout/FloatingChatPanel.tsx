import { useState, useEffect } from "react"

import ChatMessages from "../chat/ChatMessages"
import ChatInput from "../chat/ChatInput"
import ParticipantList from "../participants/ParticipantList"

import { useChat } from "../../context/chatContext"

import type { Participant } from "../../types/session.types"

interface Props {
    open: boolean
    participants: Participant[]
    pollId: string
    senderName: string
    senderRole: "TEACHER" | "STUDENT"
    showKick?: boolean
    onKick?: (id: string) => void
}

function FloatingChatPanel({
    open,
    participants,
    pollId,
    senderName,
    senderRole,
    showKick = false,
    onKick
}: Props) {

    const [tab, setTab] = useState<"chat" | "participants">("chat")

    const { messages, sendMessage } = useChat()

    useEffect(() => {

        if (!pollId || !open) return

    }, [pollId, open])

    const handleSend = (message: string) => {

        if (!message.trim()) return

        sendMessage(senderName, senderRole, message, pollId)

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

            {/* Chat Tab */}

            {tab === "chat" && (

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        overflow: "hidden"
                    }}
                >

                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto"
                        }}
                    >
                        <ChatMessages messages={messages} />
                    </div>

                    <ChatInput onSend={handleSend} />

                </div>

            )}

            {/* Participants Tab */}

            {tab === "participants" && (

                <ParticipantList
                    participants={participants}
                    onKick={showKick ? onKick : undefined}
                />

            )}

        </div>

    )

}

export default FloatingChatPanel