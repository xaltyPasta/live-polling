import { VoteService } from "../services/vote.service"

export class VoteController {

    static async submitVote(
        pollId: string,
        optionId: string,
        sessionId: string,
        name: string
    ) {

        const result = await VoteService.submitVote(
            pollId,
            optionId,
            sessionId,
            name
        )

        return result
    }

}