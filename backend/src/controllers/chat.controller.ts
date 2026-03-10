import { ChatService } from "../services/chat.service"

export class ChatController {

    static async sendMessage(
        senderName: string,
        senderRole: "TEACHER" | "STUDENT",
        message: string,
        pollId: string
    ) {

        const msg = await ChatService.sendMessage(
            senderName,
            senderRole,
            message,
            pollId
        )

        return {
            id: msg.id,
            senderName: msg.senderName,
            senderRole: msg.senderRole,
            message: msg.message,
            createdAt: msg.createdAt
        }

    }

    static async getRecentMessages(pollId: string) {

        const messages = await ChatService.getRecentMessages(pollId)

        return messages.map(msg => ({
            id: msg.id,
            username: msg.senderName,
            senderName: msg.senderName,
            senderRole: msg.senderRole,
            message: msg.message,
            createdAt: msg.createdAt
        }))

    }

}