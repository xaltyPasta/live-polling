import { PollService } from "../services/poll.service"
import { ChatService } from "../services/chat.service"
import { getRemainingTime } from "../utils/timer.util"
import { PollTimerManager } from "../socket/pollTimer.manager"
import { Server } from "socket.io"

export class PollController {


    static async getActivePollState(sessionId?: string) {

        const poll = await PollService.getActivePoll()

        if (!poll) {
            return {
                poll: null,
                results: [],
                remainingTime: 0,
                studentVote: null
            }
        }

        const remainingTime = getRemainingTime(
            poll.startTime,
            poll.duration
        )

        const results =
            await PollService.getPollResults(poll.id)

        let studentVote = null

        if (sessionId) {

            const vote =
                await PollService.getStudentVote(
                    poll.id,
                    sessionId
                )

            studentVote = vote?.optionId || null
        }

        return {
            poll,
            results,
            remainingTime,
            studentVote
        }

    }

    static async getPollState(sessionId: string) {

        const poll = await PollService.getActivePoll()

        if (!poll) {
            return {
                poll: null,
                results: [],
                remainingTime: 0,
                studentVote: null,
                messages: []
            }
        }

        const remainingTime = getRemainingTime(
            poll.startTime,
            poll.duration
        )

        const results =
            await PollService.getPollResults(poll.id)

        const vote =
            await PollService.getStudentVote(
                poll.id,
                sessionId
            )

        const messages =
            await ChatService.getRecentMessages(poll.id)

        return {
            poll,
            results,
            remainingTime,
            studentVote: vote?.optionId || null,
            messages
        }

    }

    static async createPoll(
        io: Server,
        question: string,
        options: { text: string, isCorrect: boolean }[],
        duration: number
    ) {

        const poll =
            await PollService.createPoll(
                question,
                options,
                duration
            )

        await PollTimerManager.schedulePollEnd(
            io,
            poll.id,
            poll.startTime,
            poll.duration
        )

        return poll
    }

    static async endPoll(pollId: string) {

        return PollService.endPoll(pollId)

    }

    static async getPollResults(pollId: string) {

        return PollService.getPollResults(pollId)

    }

    static async getPollHistory() {

        return PollService.getPollHistory()

    }

}