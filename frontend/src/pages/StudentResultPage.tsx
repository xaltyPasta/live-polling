import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"
import ChatButton from "../components/chat/ChatButton"
import FloatingChatPanel from "../components/layout/FloatingChatPanel"

import { useSocket } from "../hooks/socket"
import type { Poll, PollOption } from "../types/poll.types"

function StudentResultPage() {

    const socket = useSocket()
    const navigate = useNavigate()

    const [poll, setPoll] = useState<Poll | null>(null)
    const [chatOpen, setChatOpen] = useState<boolean>(false)

    const username = sessionStorage.getItem("username") || "Student"
    const sessionId = sessionStorage.getItem("sessionId")

    const toggleChat = () => {
        setChatOpen(prev => !prev)
    }

    const requestState = () => {
        if (!socket) return

        socket.emit("student:join", {
            name: username,
            sessionId
        })
    }

    const handlePollUpdate = (payload: any) => {

        setPoll(prev => {

            if (!prev) {
                return {
                    id: payload.pollId,
                    question: "",
                    options: payload.results as PollOption[],
                    duration: 0,
                    startTime: Date.now()
                }
            }

            return {
                ...prev,
                options: payload.results as PollOption[]
            }

        })

    }

    const handlePollEnded = (payload: any) => {

        if (!payload?.poll) return

        const updatedPoll: Poll = {
            ...payload.poll,
            options: payload.results as PollOption[]
        }

        setPoll(updatedPoll)

    }

    const handlePollState = (payload: any) => {

        if (!payload) return

        if (payload.poll && payload.poll.status === "ACTIVE") {
            navigate("/student/vote")
            return
        }

        if (payload.poll) {
            setPoll(payload.poll)
        }

    }

    const handlePollStarted = () => {
        navigate("/student/vote")
    }

    const handleStudentRemoved = () => {
        navigate("/kicked")
    }

    useEffect(() => {

        if (!socket) return

        if (socket.connected) {
            requestState()
        } else {
            socket.once("connect", requestState)
        }

        socket.on("poll:update", handlePollUpdate)
        socket.on("poll:ended", handlePollEnded)
        socket.on("poll:state", handlePollState)
        socket.on("poll:started", handlePollStarted)
        socket.on("student:removed", handleStudentRemoved)

        return () => {

            socket.off("poll:update", handlePollUpdate)
            socket.off("poll:ended", handlePollEnded)
            socket.off("poll:state", handlePollState)
            socket.off("poll:started", handlePollStarted)
            socket.off("student:removed", handleStudentRemoved)

        }

    }, [socket])

    if (!poll) {

        return (
            <div style={{ marginTop: "25dvh" }}>
                <PageContainer maxWidth={640}>
                    <div style={{ textAlign: "center" }}>
                        Waiting for results...
                    </div>
                </PageContainer>
            </div>
        )

    }

    return (

        <div style={{ marginTop: "25dvh" }}>

            <PageContainer maxWidth={640}>

                <PollCard question={poll.question}>

                    <PollResults
                        options={poll.options}
                        showCorrect
                    />

                </PollCard>

                <p style={{
                    paddingTop: "5dvh",
                    fontSize: "20px",
                    fontWeight: "bold"
                }}>
                    Waiting for the teacher to ask the next question..
                </p>

                <ChatButton onClick={toggleChat} />

                <FloatingChatPanel
                    open={chatOpen}
                    participants={[]}
                />

            </PageContainer>

        </div>

    )

}

export default StudentResultPage