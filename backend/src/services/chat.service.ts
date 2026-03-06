import { prisma } from "../prisma/prisma"

export class ChatService {

    static async sendMessage(
        senderName: string,
        senderRole: "TEACHER" | "STUDENT",
        message: string,
        pollId?: string
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

    static async getRecentMessages(pollId?: string) {

        return prisma.message.findMany({
            where: { pollId },
            orderBy: { createdAt: "asc" },
            take: 50
        })

    }

}