import axios from "axios"
import type { Poll } from "../types/poll.types"

const API_URL = import.meta.env.BACKEND_URL

export async function getPollHistory(): Promise<Poll[]> {
    const res = await axios.get(`${API_URL}/polls/history`)

    const polls = res.data

    return polls.map((poll: any) => ({
        id: poll.id,
        question: poll.question,
        startTime: poll.createdAt,
        duration: 0,

        options: poll.options.map((o: any) => ({
            id: o.id,
            text: o.text,
            correct: o.correct,
            votes: o.votes.length
        }))
    }))
}