interface Props {
    question: string
    children: React.ReactNode
}

function PollCard({ question, children }: Props) {
    return (
        <div
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "24px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
        >
            <h5 style={{ marginBottom: "20px" }}>{question}</h5>

            {children}
        </div>
    )
}

export default PollCard