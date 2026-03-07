interface Props {
    text: string
    selected: boolean
    onClick: () => void
}

function PollOption({ text, selected, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: selected
                    ? "2px solid var(--accent-purple)"
                    : "1px solid #ddd",
                marginBottom: "12px",
                cursor: "pointer",
                background: selected ? "#f6f4ff" : "white",
                transition: "0.2s",
            }}
        >
            {text}
        </div>
    )
}

export default PollOption