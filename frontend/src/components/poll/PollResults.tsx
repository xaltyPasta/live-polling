import type { PollOption } from "../../types/poll.types"

interface Props {
    options?: PollOption[]
    showCorrect?: boolean
}

function PollResults({ options = [], showCorrect = false }: Props) {

    if (!options.length) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                Waiting for results...
            </div>
        )
    }

    const totalVotes = options.reduce((sum, option) => {
        return sum + (option.votes || 0)
    }, 0)

    const calculatePercent = (votes: number) => {
        if (!totalVotes) return 0
        return Math.round((votes / totalVotes) * 100)
    }

    return (
        <div
            style={{
                width: "678px",
                display: "flex",
                flexDirection: "column",
                gap: "11px"
            }}
        >

            {options.map((option, index) => {

                const percent = calculatePercent(option.votes || 0)
                const highlight = showCorrect && option.correct

                return (

                    <div
                        key={option.id ?? `option-${index}`}
                        style={{
                            position: "relative",
                            height: "55px",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 23px",
                            gap: "10px",
                            background: "#F7F7F7",
                            border: "1px solid rgba(141,141,141,0.19)",
                            borderRadius: "6px",
                            overflow: "hidden"
                        }}
                    >

                        {/* Progress Fill */}
                        <div
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                height: "100%",
                                width: `${percent}%`,
                                background: "#6766D5",
                                borderRadius: "6px",
                                transition: "width 0.35s ease",
                                zIndex: 0
                            }}
                        />

                        {/* Option Number */}
                        <div
                            style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "22px",
                                background: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "Sora",
                                fontWeight: 600,
                                fontSize: "11px",
                                color: "#6766D5",
                                zIndex: 3
                            }}
                        >
                            {index + 1}
                        </div>

                        {/* Text container */}
                        <div
                            style={{
                                position: "relative",
                                fontFamily: "Sora",
                                fontSize: "16px",
                                fontWeight: 600,
                                zIndex: 2
                            }}
                        >

                            <span style={{ color: "#292929" }}>
                                {option.text} {highlight ? "✓" : ""}
                            </span>

                            <span
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    whiteSpace: "nowrap",
                                    color: "white",
                                    overflow: "hidden",
                                    width: `${percent}%`,
                                    pointerEvents: "none"
                                }}
                            >
                                {option.text} {highlight ? "✓" : ""}
                            </span>

                        </div>

                        {/* Percentage */}
                        <div
                            style={{
                                position: "absolute",
                                right: "20px",
                                fontFamily: "Sora",
                                fontWeight: 600,
                                fontSize: "16px",
                                color: "#000",
                                zIndex: 3
                            }}
                        >
                            {percent}%
                        </div>

                    </div>

                )

            })}

        </div>
    )
}

export default PollResults