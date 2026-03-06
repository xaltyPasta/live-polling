import { prisma } from "../prisma/prisma"
import { AppError } from "../utils/AppError"

export class PollService {

    static async getActivePoll() {
        return prisma.poll.findFirst({
            where: { status: "ACTIVE" },
            include: {
                options: true
            }
        })
    }

    static async createPoll(
        question: string,
        options: string[],
        duration: number
    ) {

        const activePoll = await prisma.poll.findFirst({
            where: { status: "ACTIVE" }
        })

        if (activePoll) {
            throw new AppError("Active poll already exists", 400)
        }

        return prisma.poll.create({
            data: {
                question,
                duration,
                startTime: new Date(),
                status: "ACTIVE",
                options: {
                    create: options.map((o) => ({
                        text: o
                    }))
                }
            },
            include: {
                options: true
            }
        })
    }

    static async endPoll(pollId: string) {
        return prisma.poll.update({
            where: { id: pollId },
            data: {
                status: "COMPLETED",
                endedAt: new Date()
            }
        })
    }

    static async getPollResults(pollId: string) {

        const poll = await prisma.poll.findUnique({
            where: { id: pollId },
            include: {
                options: {
                    include: {
                        votes: true
                    }
                }
            }
        })

        if (!poll) throw new Error("Poll not found")

        const totalVotes = poll.options.reduce(
            (sum: number, opt: any) => sum + opt.votes.length,
            0
        )

        return poll.options.map((opt: any) => {

            const votes = opt.votes.length

            return {
                optionId: opt.id,
                text: opt.text,
                votes,
                percentage:
                    totalVotes === 0
                        ? 0
                        : Math.round((votes / totalVotes) * 100)
            }
        })
    }

    static async getStudentVote(
        pollId: string,
        sessionId: string
    ) {

        return prisma.vote.findFirst({
            where: {
                pollId,
                sessionId
            }
        })
    }

    static async getPollHistory() {

        return prisma.poll.findMany({
            where: {
                status: "COMPLETED"
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                options: {
                    include: {
                        votes: true
                    }
                }
            }
        })
    }
}