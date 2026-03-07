import type { Participant } from "../../types/session.types"

interface Props {
    participants: Participant[]
    onKick?: (sessionId: string) => void
}

function ParticipantList({ participants, onKick }: Props) {
    return (
        <div
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
            }}
        >
            <h6 style={{ marginBottom: "16px" }}>Participants</h6>

            {participants.map((p) => (
                <div
                    key={p.sessionId}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}
                >
                    <span>{p.username}</span>

                    {onKick && (
                        <button
                            onClick={() => onKick(p.sessionId)}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "red",
                                cursor: "pointer",
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