interface Props {
    value: string
    index: number
    isCorrect: boolean
    onChange: (index: number, value: string) => void
    onToggleCorrect: (index: number, value: boolean) => void
    onDelete: (index: number) => void
}

function OptionEditor({
    value,
    index,
    isCorrect,
    onChange,
    onToggleCorrect,
    onDelete
}: Props) {

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
                    width: 24,
                    height: 24,
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

                {/* YES */}
                <div
                    onClick={() => onToggleCorrect(index, true)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: isCorrect ? "#8F64E1" : "#D9D9D9",
                            border: "1px solid #B4B4B4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isCorrect && (
                            <div
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: "50%",
                                    border: "1px solid white",
                                    boxSizing: "border-box",
                                }}
                            />
                        )}
                    </div>

                    Yes
                </div>

                {/* NO */}
                <div
                    onClick={() => onToggleCorrect(index, false)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: !isCorrect ? "#8F64E1" : "#D9D9D9",
                            border: "1px solid #B4B4B4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {!isCorrect && (
                            <div
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: "50%",
                                    border: "1px solid white",
                                    boxSizing: "border-box",
                                }}
                            />
                        )}
                    </div>

                    No
                </div>

            </div>
            {/* Delete option */}
            <button
                onClick={() => onDelete(index)}
                style={{
                    marginLeft: 20,
                    border: "none",
                    background: "transparent",
                    fontSize: 18,
                    cursor: "pointer",
                    color: "#888",
                }}
            >
                ✕
            </button>

        </div>
    )
}

export default OptionEditor