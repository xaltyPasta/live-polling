import type { Participant } from "../../types/session.types"

interface Props {
    participants: Participant[]
    onKick?: (sessionId: string) => void
}

function ParticipantList({ participants = [], onKick }: Props) {

    return (

        <div
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
                overflowY: "auto"
            }}
        >

            <h6 style={{ marginBottom: "16px" }}>
                Participants
            </h6>

            {participants.length === 0 && (
                <div style={{ color: "#777" }}>
                    No participants yet
                </div>
            )}

            {participants.map((p) => (

                <div
                    key={p.sessionId}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                        paddingBottom: "6px",
                        borderBottom: "1px solid #eee"
                    }}
                >

                    <span>{p.username}</span>

                    {onKick && (
                        <button
                            onClick={() => onKick(p.sessionId)}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#ff4d4f",
                                cursor: "pointer",
                                fontWeight: 500
                            }}
                        >
                            Kick
                        </button>
                    )}

                </div>

            ))}

        </div>

    )

}

export default ParticipantList