import { Router } from "express"
import { PollController } from "../controllers/poll.controller"

const router = Router()

// Get active poll state
router.get("/active", async (req, res) => {

    try {

        const sessionId =
            req.query.sessionId as string | undefined

        const state =
            await PollController.getActivePollState(
                sessionId
            )

        res.json(state)

    } catch {

        res.status(500).json({
            error: "Failed to fetch active poll"
        })

    }

})

//History

router.get("/history", async (req, res) => {

    try {

        const polls = await PollController.getPollHistory()

        res.json(polls)

    } catch {

        res.status(500).json({
            error: "Failed to fetch poll history"
        })

    }

})

export default router