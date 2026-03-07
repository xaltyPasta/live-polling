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
        options: {
            text: string,
            isCorrect: boolean
        }[],
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
                        text: o.text,
                        isCorrect: o.isCorrect
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
            },
            include: {
                options: true
            }
        })
    }

    static async getPollResults(pollId: string) {

        const options = await prisma.option.findMany({
            where: { pollId },
            include: {
                votes: true
            }
        })

        const totalVotes = options.reduce(
            (sum, option) => sum + option.votes.length,
            0
        )

        return options.map(option => {

            const voteCount = option.votes.length

            const percentage =
                totalVotes === 0
                    ? 0
                    : Math.round((voteCount / totalVotes) * 100)

            return {
                optionId: option.id,
                text: option.text,
                votes: voteCount,
                percentage,
                isCorrect: option.isCorrect
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