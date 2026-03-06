import { prisma } from "../prisma/prisma"
import { PollService } from "./poll.service"
import { AppError } from "../utils/AppError"

export class VoteService {

    static async submitVote(
        pollId: string,
        optionId: string,
        sessionId: string,
        name: string
    ) {

        const poll = await prisma.poll.findUnique({
            where: { id: pollId }
        })

        if (!poll) {
            throw new AppError("Poll not found", 404)
        }

        if (poll.status !== "ACTIVE") {
            throw new AppError("Poll is not active", 400)
        }

        try {

            const vote = await prisma.vote.create({
                data: {
                    pollId,
                    optionId,
                    sessionId,
                    name
                }
            })

            const results =
                await PollService.getPollResults(pollId)

            return {
                vote,
                results
            }

        } catch {

            throw new Error("You already voted")

        }

    }

}