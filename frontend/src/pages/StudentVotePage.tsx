import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useSocket } from "../hooks/socket"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollOption from "../components/poll/PollOption"
import PollTimer from "../components/poll/PollTimer"

import type { Poll } from "../types/poll.types"

interface PollStatePayload {
  poll: Poll
  results: any[]
  remainingTime: number
}

function StudentVotePage() {
  const socket = useSocket()
  const navigate = useNavigate()

  const [poll, setPoll] = useState<Poll | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const handlePollState = (payload: PollStatePayload) => {
    console.log("poll received", payload)

    if (!payload?.poll) return

    setPoll({
      ...payload.poll,
      startTime: new Date(payload.poll.startTime).getTime()
    })

    setSelected(null)
  }

  const handleStudentRemoved = () => {
    navigate("/kicked")
  }

  useEffect(() => {
    if (!socket) return

    const onConnect = () => {
      console.log("socket connected", socket.id)

      socket.emit("student:join", {
        name: sessionStorage.getItem("username"),
        sessionId: sessionStorage.getItem("sessionId")
      })
    }

    socket.on("connect", onConnect)

    socket.on("poll:state", handlePollState)
    socket.on("poll:created", handlePollState)
    socket.on("student:removed", handleStudentRemoved)

    return () => {
      socket.off("connect", onConnect)
      socket.off("poll:state", handlePollState)
      socket.off("poll:created", handlePollState)
      socket.off("student:removed", handleStudentRemoved)
    }

  }, [socket])

  const submitVote = () => {
    if (!selected || !poll) return

    socket?.emit("student:submit_vote", {
      pollId: poll.id,
      optionId: selected,
      sessionId: sessionStorage.getItem("sessionId"),
      name: sessionStorage.getItem("username")
    })

    navigate("/student/result")
  }

  if (!poll) {
    return (
      <PageContainer maxWidth={640}>
        <div style={{ textAlign: "center" }}>
          Loading poll...
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer maxWidth={640}>
      <PollCard question={poll.question}>
        <div style={{ marginBottom: "16px" }}>
          <PollTimer startTime={poll.startTime} duration={poll.duration} />
        </div>

        {poll.options.map((option) => (
          <PollOption
            key={option.id}
            text={option.text}
            selected={selected === option.id}
            onClick={() => setSelected(option.id)}
          />
        ))}

        <button
          onClick={submitVote}
          style={{
            marginTop: "10px",
            background: "var(--gradient-primary)",
            border: "none",
            padding: "10px 24px",
            borderRadius: "20px",
            color: "white"
          }}
        >
          Submit
        </button>

      </PollCard>
    </PageContainer>
  )
}

export default StudentVotePage