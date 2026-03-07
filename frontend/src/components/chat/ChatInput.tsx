import { useState } from "react"

interface Props {
    onSend: (message: string) => void
}

function ChatInput({ onSend }: Props) {
    const [text, setText] = useState("")

    const handleSend = () => {
        if (!text.trim()) return
        onSend(text)
        setText("")
    }

    return (
        <div style={{ display: "flex", gap: "6px" }}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                }}
            />

            <button
                onClick={handleSend}
                style={{
                    border: "none",
                    background: "var(--primary-purple)",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "6px",
                }}
            >
                Send
            </button>
        </div>
    )
}

export default ChatInput