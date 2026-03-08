interface Props {
    text: string
    index: number
    selected: boolean
    onClick: () => void
}

function PollOption({ text, index, selected, onClick }: Props) {

    return (
        <div
            onClick={onClick}
            style={{
                height: "55px",
                display: "flex",
                alignItems: "center",
                padding: "0 23px",
                gap: "10px",

                background: selected ? "#FFFFFF" : "#F7F7F7",
                border: selected
                    ? "1.5px solid #8F64E1"
                    : "1px solid rgba(141,141,141,0.19)",

                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
                if (!selected) {
                    e.currentTarget.style.border = "1.5px solid #8F64E1"
                }
            }}
            onMouseLeave={(e) => {
                if (!selected) {
                    e.currentTarget.style.border = "1px solid rgba(141,141,141,0.19)"
                }
            }}
        >

            {/* Number bubble */}
            <div
                style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "22px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    fontFamily: "Sora",
                    fontWeight: 600,
                    fontSize: "11px",
                    color: "#6766D5"
                }}
            >
                {index + 1}
            </div>

            {/* Option text */}
            <div
                style={{
                    fontFamily: "Sora",
                    fontSize: "16px",
                    fontWeight: selected ? 600 : 400,
                }}
            >
                {text}
            </div>

        </div>
    )
}

export default PollOption