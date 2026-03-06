import { ChatService } from "../services/chat.service"

export class ChatController {

    static async sendMessage(
        senderName: string,
        senderRole: "TEACHER" | "STUDENT",
        message: string,
        pollId?: string
    ) {

        return ChatService.sendMessage(
            senderName,
            senderRole,
            message,
            pollId
        )

    }

}