import type { ChatMessage } from "../../types/chat.types"

interface Props {
    messages: ChatMessage[]
}

function ChatMessages({ messages }: Props) {

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "13px",
                padding: "0 20px",
                overflowY: "auto",
                flex: 1
            }}
        >

            {messages.map((m) => {

                const isTeacher = m.senderRole === "TEACHER"

                return (
                    <div
                        key={m.id}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: isTeacher ? "flex-start" : "flex-end"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#4F0BD3",
                                marginBottom: "4px",
                                fontFamily: "Sora"
                            }}
                        >
                            {m.senderName}
                        </div>

                        <div
                            style={{
                                padding: "9px 10px",
                                background: isTeacher ? "#3A3A3B" : "#8F64E1",
                                color: "white",
                                borderRadius: isTeacher
                                    ? "1px 8px 8px 8px"
                                    : "8px 1px 8px 8px",
                                fontSize: "14px",
                                maxWidth: "70%",
                                fontFamily: "Sora"
                            }}
                        >
                            {m.message}
                        </div>

                    </div>
                )
            })}

        </div>
    )
}

export default ChatMessages