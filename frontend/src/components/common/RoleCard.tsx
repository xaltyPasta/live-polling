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
            className={`role-card ${selected ? "selected" : ""}`}
        >
            <h5 style={{ fontWeight: 600 }}>{title}</h5>

            <p
                style={{
                    fontSize: 14,
                    color: "var(--text-muted)",
                    marginTop: 8,
                    maxWidth: 280,
                }}
            >
                {description}
            </p>
        </div>
    )
}

export default RoleCard