export default function SpinnerWidget() {
    return (
        <div
            style={{
                width: "50px",
                height: "50px",
                border: "5px solid #e5e5e5",
                borderTop: "5px solid var(--primary-purple)",
                borderRadius: "50%",
                margin: "auto",
                animation: "spin 1s linear infinite"
            }}
        />
    )
}