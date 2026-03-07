import { Server } from "socket.io"
import { PollService } from "../services/poll.service"
import { getRemainingTime } from "../utils/timer.util"

export class PollTimerManager {

    private static timers: Map<string, NodeJS.Timeout> = new Map()

    static async schedulePollEnd(
        io: Server,
        pollId: string,
        startTime: Date,
        duration: number
    ) {

        const remaining = getRemainingTime(startTime, duration)

        if (remaining <= 0) {
            await this.endPoll(io, pollId)
            return
        }

        if (this.timers.has(pollId)) {
            return
        }

        const timer = setTimeout(async () => {

            await this.endPoll(io, pollId)

        }, remaining * 1000)

        this.timers.set(pollId, timer)
    }

    private static async endPoll(io: Server, pollId: string) {

        const poll = await PollService.endPoll(pollId)

        const results = await PollService.getPollResults(pollId)

        io.emit("poll:ended", {
            poll,
            results,
        })

        this.timers.delete(pollId)
    }

    static async recoverActivePoll(io: Server) {

        const poll = await PollService.getActivePoll()

        if (!poll) return

        await this.schedulePollEnd(
            io,
            poll.id,
            poll.startTime,
            poll.duration
        )
    }

}