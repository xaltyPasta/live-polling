import { useState } from "react"

import ChatPanel from "../chat/ChatPanel"
import ParticipantList from "../participants/ParticipantList"
import type { Participant } from "../../types/session.types"

interface Props {
    participants: Participant[]
    onKick?: (sessionId: string) => void
}

function RightSidebar({ participants, onKick }: Props) {
    const [tab, setTab] = useState<"chat" | "participants">("chat")

    return (
        <div
            style={{
                background: "white",
                borderRadius: "10px",
                height: "100%",
                padding: "16px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    marginBottom: "12px",
                    gap: "10px",
                }}
            >
                <button onClick={() => setTab("chat")}>Chat</button>
                <button onClick={() => setTab("participants")}>Participants</button>
            </div>

            {tab === "chat" && <ChatPanel />}

            {tab === "participants" && (
                <ParticipantList participants={participants} onKick={onKick} />
            )}
        </div>
    )
}

export default RightSidebar