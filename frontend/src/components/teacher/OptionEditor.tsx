interface Props {
    value: string
    index: number
    correctIndex: number | null
    onChange: (index: number, value: string) => void
    onSelectCorrect: (index: number) => void
}

function OptionEditor({
    value,
    index,
    correctIndex,
    onChange,
    onSelectCorrect,
}: Props) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                gap: "10px",
            }}
        >
            <input
                type="radio"
                checked={correctIndex === index}
                onChange={() => onSelectCorrect(index)}
            />

            <input
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                }}
            />
        </div>
    )
}

export default OptionEditor