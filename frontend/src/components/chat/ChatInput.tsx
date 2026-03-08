import { useState } from "react"

interface Props {
    onSend: (msg: string) => void
}

function ChatInput({ onSend }: Props) {

    const [text, setText] = useState("")

    const send = () => {
        if (!text.trim()) return
        onSend(text)
        setText("")
    }

    return (
        <div
            style={{
                padding: "12px",
                borderTop: "1px solid #eee",
                display: "flex",
                gap: "8px"
            }}
        >
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type message..."
                style={{
                    flex: 1,
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "8px"
                }}
            />

            <button
                onClick={send}
                style={{
                    background: "#8F64E1",
                    border: "none",
                    color: "white",
                    padding: "8px 14px",
                    borderRadius: "6px"
                }}
            >
                Send
            </button>
        </div>
    )
}

export default ChatInput