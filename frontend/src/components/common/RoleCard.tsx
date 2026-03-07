interface Props {
    title: string
    description: string
    selected: boolean
    onClick: () => void
}

function RoleCard({ title, description, selected, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                border: selected
                    ? "2px solid var(--accent-purple)"
                    : "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                cursor: "pointer",
                background: "white",
                transition: "0.2s",
            }}
        >
            <h5>{title}</h5>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
                {description}
            </p>
        </div>
    )
}

export default RoleCard