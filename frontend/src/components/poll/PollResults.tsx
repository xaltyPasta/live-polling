import type { PollOption } from "../../types/poll.types"

interface Props {
    options: PollOption[]
    showCorrect?: boolean
}

function PollResults({ options, showCorrect = false }: Props) {
    const totalVotes = options.reduce((sum, o) => sum + o.votes, 0)

    return (
        <div>
            {options.map((o) => {
                const percent = totalVotes
                    ? Math.round((o.votes / totalVotes) * 100)
                    : 0

                const highlight = showCorrect && o.correct

                return (
                    <div key={o.id} style={{ marginBottom: "14px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "14px",
                                marginBottom: "4px",
                            }}
                        >
                            <span>
                                {o.text} {highlight && "✓"}
                            </span>

                            <span>{percent}%</span>
                        </div>

                        <div
                            style={{
                                height: "8px",
                                background: "#eee",
                                borderRadius: "4px",
                            }}
                        >
                            <div
                                style={{
                                    height: "8px",
                                    width: `${percent}%`,
                                    background: highlight
                                        ? "var(--accent-purple)"
                                        : "var(--gradient-primary)",
                                    borderRadius: "4px",
                                    transition: "width 0.3s",
                                }}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default PollResults