import { prisma } from "../prisma/prisma"

export class ChatService {

    static async sendMessage(
        senderName: string,
        senderRole: "TEACHER" | "STUDENT",
        message: string,
        pollId: string
    ) {

        return prisma.message.create({
            data: {
                senderName,
                senderRole,
                message,
                pollId
            }
        })

    }

    static async getRecentMessages(pollId: string) {

        const messages = await prisma.message.findMany({
            where: { pollId },
            orderBy: { createdAt: "desc" },
            take: 50
        })

        return messages.reverse()

    }

}