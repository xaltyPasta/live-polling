import { ChatService } from "../services/chat.service"

export class ChatController {

    static async sendMessage(
        senderName: string,
        senderRole: "TEACHER" | "STUDENT",
        message: string,
        pollId?: string
    ) {

        const msg = await ChatService.sendMessage(
            senderName,
            senderRole,
            message,
            pollId
        )

        return {
            id: msg.id,
            username: msg.senderName,
            message: msg.message,
            createdAt: msg.createdAt
        }

    }

}