import type { ChatMessage } from "../../types/chat.types"

interface Props {
    messages: ChatMessage[]
}

function ChatMessages({ messages }: Props) {
    return (
        <div
            style={{
                flex: 1,
                overflowY: "auto",
                marginBottom: "10px",
            }}
        >
            {messages.map((m) => (
                <div key={m.id} style={{ marginBottom: "8px" }}>
                    <strong>{m.username}</strong>
                    <div
                        style={{
                            background: "#f4f4f4",
                            padding: "8px",
                            borderRadius: "6px",
                            fontSize: "14px",
                        }}
                    >
                        {m.message}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatMessages