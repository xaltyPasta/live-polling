import { useEffect, useState } from "react"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"

import { useSocket } from "../hooks/socket"
import type { Poll } from "../types/poll.types"
import { useNavigate } from "react-router-dom"

function StudentResultPage() {
    const socket = useSocket()
    const navigate = useNavigate()

    const [poll, setPoll] = useState<Poll | null>(null)

    useEffect(() => {
        socket.on("poll:update", (data: Poll) => {
            setPoll(data)
        })

        socket.on("poll:ended", (data: Poll) => {
            setPoll(data)
        })

        socket.on("student:removed", () => {
            navigate("/kicked")
        })

        return () => {
            socket.off("poll:update")
            socket.off("poll:ended")
            socket.off("student:removed")
        }
    }, [socket])

    if (!poll) return null

    return (
        <PageContainer maxWidth={640}>
            <PollCard question={poll.question}>
                <PollResults options={poll.options} showCorrect />

                <div
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                        color: "var(--text-muted)",
                    }}
                >
                    Wait for the teacher to ask the next question..
                </div>
            </PollCard>
        </PageContainer>
    )
}

export default StudentResultPage