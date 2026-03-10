export interface ChatMessage {
    id: string
    senderName: string
    senderRole: "TEACHER" | "STUDENT"
    message: string
    createdAt: string
}