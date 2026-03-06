import { prisma } from "../prisma/prisma"

export class SessionService {

    static async registerStudent(
        sessionId: string,
        name: string,
        socketId: string
    ) {

        return prisma.studentSession.upsert({
            where: { sessionId },
            update: {
                socketId,
                active: true
            },
            create: {
                sessionId,
                name,
                socketId
            }
        })

    }

    static async markInactive(socketId: string) {

        return prisma.studentSession.updateMany({
            where: { socketId },
            data: { active: false }
        })

    }

    static async removeStudent(sessionId: string) {

        const student = await prisma.studentSession.update({
            where: { sessionId },
            data: {
                active: false
            }
        })

        return student
    }

    static async getActiveStudents() {

        return prisma.studentSession.findMany({
            where: { active: true }
        })

    }

}