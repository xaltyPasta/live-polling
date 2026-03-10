import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useSocket } from "../hooks/socket"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollOption from "../components/poll/PollOption"
import ChatButton from "../components/chat/ChatButton"
import FloatingChatPanel from "../components/layout/FloatingChatPanel"

import type { Poll } from "../types/poll.types"
import type { Participant } from "../types/session.types"

import SpinnerWidget from "../components/common/SpinnerWidget"

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

  const [chatOpen, setChatOpen] = useState(false)
  const [participants, setParticipants] = useState<Participant[]>([])

  const username = sessionStorage.getItem("username") || "Student"

  const toggleChat = () => {
    setChatOpen(prev => !prev)
  }

  const handlePollState = (payload: PollStatePayload) => {

    if (!payload?.poll) return

    setPoll({
      ...payload.poll,
      startTime: new Date(payload.poll.startTime).getTime()
    })

    setSelected(null)

  }

  const handleParticipantsUpdate = (data: Participant[]) => {
    setParticipants(data)
  }

  const handleStudentRemoved = () => {
    navigate("/kicked")
  }

  useEffect(() => {

    if (!socket) return

    const requestState = () => {

      socket.emit("student:join", {
        name: sessionStorage.getItem("username"),
        sessionId: sessionStorage.getItem("sessionId"),
      })

    }

    if (socket.connected) {
      requestState()
    } else {
      socket.once("connect", requestState)
    }

    socket.on("poll:state", handlePollState)
    socket.on("poll:created", handlePollState)
    socket.on("student:removed", handleStudentRemoved)
    socket.on("participants:update", handleParticipantsUpdate)

    return () => {

      socket.off("poll:state", handlePollState)
      socket.off("poll:created", handlePollState)
      socket.off("student:removed", handleStudentRemoved)
      socket.off("participants:update", handleParticipantsUpdate)

    }

  }, [socket, navigate])

  const submitVote = () => {

    if (!selected || !poll) return

    socket?.emit("student:submit_vote", {
      pollId: poll.id,
      optionId: selected,
      sessionId: sessionStorage.getItem("sessionId"),
      name: sessionStorage.getItem("username")
    })

    socket.once("vote:confirmed", () => {
      navigate("/student/result")
    })

  }

  if (!poll) {
    return (
      <div style={{ marginTop: "25dvh" }}>
        <PageContainer maxWidth={640}>
          <SpinnerWidget />
          <div className="common-text-style">
            Loading poll...
          </div>
        </PageContainer>
      </div>
    )
  }

  return (

    <div style={{ marginTop: "25dvh" }}>

      <PageContainer maxWidth={640}>

        <div style={{ position: "relative", width: "fit-content" }}>

          <PollCard
            question={poll.question}
            startTime={poll.startTime}
            duration={poll.duration}
          >

            {poll.options.map((option, index) => (
              <PollOption
                key={option.id}
                index={index}
                text={option.text}
                selected={selected === option.id}
                onClick={() => setSelected(option.id)}
              />
            ))}

          </PollCard>

          <button
            onClick={submitVote}
            disabled={!selected}
            style={{
              position: "absolute",
              right: "0",
              bottom: "-80px",
              width: "233.93px",
              height: "57.58px",
              borderRadius: "34px",
              border: "none",
              cursor: selected ? "pointer" : "not-allowed",
              background: "linear-gradient(99.18deg,#8F64E1 -46.89%,#1D68BD 223.45%)",
              fontFamily: "Sora",
              fontWeight: 600,
              fontSize: "18px",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: selected ? 1 : 0.6,
              transition: "all 0.2s ease"
            }}
          >
            Submit
          </button>

        </div>

        <ChatButton onClick={toggleChat} />

        <FloatingChatPanel
          open={chatOpen}
          senderName={username}
          senderRole="STUDENT"
          pollId={poll.id}
          participants={participants}
          showKick={false}
        />

      </PageContainer>

    </div>

  )

}

export default StudentVotePage