import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"

import { useSocket } from "../hooks/socket"
import type { Poll, PollOption } from "../types/poll.types"

function StudentResultPage() {
    const socket = useSocket()
    const navigate = useNavigate()

    const [poll, setPoll] = useState<Poll | null>(null)

    useEffect(() => {
        if (!socket) return

        // request latest poll state when page loads
        const requestState = () => {
            socket.emit("student:join", {
                name: sessionStorage.getItem("username"),
                sessionId: sessionStorage.getItem("sessionId"),
            })
        }

        if (socket.connected) requestState()
        else socket.once("connect", requestState)

        const handlePollUpdate = (payload: any) => {
            setPoll((prev) => {
                if (!prev) {
                    return {
                        id: payload.pollId,
                        question: "",
                        options: payload.results as PollOption[],
                        duration: 0,
                        startTime: Date.now()
                    } as Poll
                }

                return {
                    ...prev,
                    options: payload.results as PollOption[]
                }
            })
        }

        const handlePollEnded = (payload: any) => {
            if (payload?.poll) {
                setPoll({
                    ...payload.poll,
                    options: payload.results as PollOption[]
                })
            }
        }

        const handlePollState = (payload: any) => {
            if (payload?.poll) {
                setPoll(payload.poll)
            }
        }

        const handleStudentRemoved = () => {
            navigate("/kicked")
        }

        socket.on("poll:update", handlePollUpdate)
        socket.on("poll:ended", handlePollEnded)
        socket.on("poll:state", handlePollState)
        socket.on("student:removed", handleStudentRemoved)

        return () => {
            socket.off("poll:update", handlePollUpdate)
            socket.off("poll:ended", handlePollEnded)
            socket.off("poll:state", handlePollState)
            socket.off("student:removed", handleStudentRemoved)
        }
    }, [socket, navigate])

    if (!poll) {
        return (
            <PageContainer maxWidth={640}>
                <div style={{ textAlign: "center" }}>
                    Waiting for results...
                </div>
            </PageContainer>
        )
    }

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