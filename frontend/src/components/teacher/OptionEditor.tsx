interface Props {
    value: string
    index: number
    correctIndex: number | null
    onChange: (index: number, value: string) => void
    onSelectCorrect: (index: number | null) => void
}

function OptionEditor({
    value,
    index,
    correctIndex,
    onChange,
    onSelectCorrect,
}: Props) {

    const isCorrect = correctIndex === index

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                marginTop: 12,
            }}
        >

            {/* option number */}
            <div
                style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#8F64E1",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    marginRight: 14,
                }}
            >
                {index + 1}
            </div>

            {/* option input */}
            <input
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder="Option"
                style={{
                    width: 507,
                    height: 60,
                    background: "#F2F2F2",
                    border: "none",
                    borderRadius: 2,
                    paddingLeft: 20,
                    fontSize: 18,
                    marginRight: 40,
                }}
            />

            {/* Yes / No */}
            <div style={{ width: 139, display: "flex", gap: 17 }}>

                <div
                    onClick={() => onSelectCorrect(index)}
                    style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}
                >
                    <div
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            border: "2px solid #8F64E1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isCorrect && (
                            <div
                                style={{
                                    width: 14,
                                    height: 14,
                                    borderRadius: "50%",
                                    background: "#8F64E1",
                                }}
                            />
                        )}
                    </div>

                    Yes
                </div>

                <div
                    onClick={() => {
                        if (isCorrect) onSelectCorrect(null)
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}
                >
                    <div
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: "#D9D9D9",
                            border: "1px solid #B4B4B4",
                        }}
                    />

                    No
                </div>

            </div>

        </div>
    )
}

export default OptionEditor