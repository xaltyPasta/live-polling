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
            className="gradient-button"
        >
            {label}
        </button>
    )
}

export default GradientButton