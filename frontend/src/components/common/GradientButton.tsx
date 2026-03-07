interface Props {
    label: string
    onClick?: () => void
    disabled?: boolean
}

function GradientButton({ label, onClick, disabled }: Props) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                background: "var(--gradient-primary)",
                border: "none",
                padding: "12px 40px",
                borderRadius: "28px",
                color: "white",
                fontWeight: 500,
                opacity: disabled ? 0.6 : 1,
            }}
        >
            {label}
        </button>
    )
}

export default GradientButton