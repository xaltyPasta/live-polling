import { useEffect, useState } from "react"
import { useSocket } from "../hooks/socket"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollOption from "../components/poll/PollOption"
import PollTimer from "../components/poll/PollTimer"

import type { Poll } from "../types/poll.types"
import { useNavigate } from "react-router-dom"

function StudentVotePage() {
  const socket = useSocket()
  const navigate = useNavigate()

  const [poll, setPoll] = useState<Poll | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    socket.on("poll:state", (data: Poll) => {
      setPoll(data)
    })

    socket.on("student:removed", () => {
      navigate("/kicked")
    })

    return () => {
      socket.off("poll:state")
      socket.off("student:removed")
    }
  }, [socket])

  const submitVote = () => {
    if (!selected) return

    socket.emit("student:submit_vote", {
      optionId: selected,
    })

    navigate("/student/result")
  }

  if (!poll) return null

  return (
    <PageContainer maxWidth={640}>
      <PollCard question={poll.question}>
        <div style={{ marginBottom: "16px" }}>
          <PollTimer
            startTime={poll.startTime}
            duration={poll.duration}
          />
        </div>

        {poll.options.map((o) => (
          <PollOption
            key={o.id}
            text={o.text}
            selected={selected === o.id}
            onClick={() => setSelected(o.id)}
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
            color: "white",
          }}
        >
          Submit
        </button>
      </PollCard>
    </PageContainer>
  )
}

export default StudentVotePage
