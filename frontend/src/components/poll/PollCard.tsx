import PollTimer from "./PollTimer"

interface Props {
    question: string
    startTime?: number
    duration?: number
    children: React.ReactNode
}

function PollCard({ question, startTime, duration, children }: Props) {
    return (
        <div style={{ width: "727px" }}>

            {/* Header Row */}
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "12px",
                    marginBottom: "16px"
                }}
            >
                <div
                    style={{
                        fontFamily: "Sora",
                        fontWeight: 600,
                        fontSize: "22px",
                        lineHeight: "28px"
                    }}
                >
                    Question
                </div>

                {startTime && duration && (
                    <PollTimer
                        startTime={startTime}
                        duration={duration}
                    />
                )}
            </div>

            <div
                style={{
                    border: "1px solid #AF8FF1",
                    borderRadius: "9px",
                    overflow: "hidden",
                    background: "white"
                }}
            >

                {/* Question bar */}
                <div
                    style={{
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "16px",
                        background:
                            "linear-gradient(90deg,#343434 0%,#6E6E6E 100%)",
                        fontFamily: "Sora",
                        fontWeight: 600,
                        fontSize: "17px",
                        color: "white"
                    }}
                >
                    {question}
                </div>

                {/* Options */}
                <div
                    style={{
                        padding: "18px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "11px"
                    }}
                >
                    {children}
                </div>

            </div>
        </div>
    )
}

export default PollCard