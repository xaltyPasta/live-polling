import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"
import FloatingChatPanel from "../components/layout/FloatingChatPanel"
import ChatButton from "../components/chat/ChatButton"

import { useSocket } from "../hooks/socket"

import type { Poll, PollOption } from "../types/poll.types"
import type { Participant } from "../types/session.types"

import SpinnerWidget from "../components/common/SpinnerWidget"

interface PollEndResult {
  optionId: string
  text: string
  votes: number
  percentage: number
  isCorrect: boolean
}

function TeacherLiveResultsPage() {

  const socket = useSocket()
  const navigate = useNavigate()

  const [poll, setPoll] = useState<Poll | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [results, setResults] = useState<PollEndResult[]>([])
  const [ended, setEnded] = useState(false)

  const [chatOpen, setChatOpen] = useState(false)

  const normalizePoll = (incoming: any): Poll => ({
    ...incoming,
    startTime: new Date(incoming.startTime).getTime()
  })

  const handlePollCreated = (payload: any) => {

    const incomingPoll = payload.poll ?? payload

    setPoll(normalizePoll(incomingPoll))
    setEnded(false)

    if (payload?.results) {
      setResults(payload.results)
    }

  }

  const handlePollUpdate = (payload: any) => {

    if (payload?.results) {

      setPoll(prev => {

        if (!prev) return prev

        return {
          ...prev,
          options: payload.results
        }

      })

      return
    }

    const incomingPoll = payload.poll ?? payload
    setPoll(normalizePoll(incomingPoll))

  }

  const handlePollEnded = (payload: any) => {

    if (payload?.poll) {
      setPoll(normalizePoll(payload.poll))
    }

    if (payload?.results) {
      setResults(payload.results)
    }

    setEnded(true)

  }

  const handlePollState = (payload: any) => {

    if (!payload?.poll) return

    const restoredPoll = normalizePoll(payload.poll)

    if (payload?.results) {
      restoredPoll.options = payload.results
    }

    setPoll(restoredPoll)

    if (payload?.participants) {
      setParticipants(payload.participants)
    }

  }

  const handleParticipantsUpdate = (data: Participant[]) => {
    setParticipants(data)
  }

  useEffect(() => {

    if (!socket) return

    const requestState = () => {
      socket.emit("teacher:request_state")
    }

    if (socket.connected) {
      requestState()
    } else {
      socket.once("connect", requestState)
    }

    socket.on("poll:state", handlePollState)
    socket.on("poll:created", handlePollCreated)
    socket.on("poll:update", handlePollUpdate)
    socket.on("poll:ended", handlePollEnded)
    socket.on("participants:update", handleParticipantsUpdate)

    return () => {

      socket.off("poll:state", handlePollState)
      socket.off("poll:created", handlePollCreated)
      socket.off("poll:update", handlePollUpdate)
      socket.off("poll:ended", handlePollEnded)
      socket.off("participants:update", handleParticipantsUpdate)

    }

  }, [socket])

  const kickStudent = (sessionId: string) => {

    if (!socket) return

    socket.emit("teacher:remove_student", { sessionId })

  }

  if (!poll) {

    return (
      <div style={{ marginTop: "25dvh" }}>
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "80px"
          }}
        >
          <button
            onClick={() => navigate("/history")}
            style={{
              height: "46px",
              padding: "0 24px",
              borderRadius: "28px",
              border: "none",
              cursor: "pointer",
              background:
                "linear-gradient(99.18deg,#8F64E1 -46.89%,#1D68BD 223.45%)",
              fontFamily: "Sora",
              fontWeight: 600,
              fontSize: "14px",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            👁 View Poll history
          </button>
        </div>

        <PageContainer maxWidth={620}>
          <SpinnerWidget />
          <div className="common-text-style">
            Waiting for poll data...
          </div>
        </PageContainer>
      </div>
    )

  }

  return (

    <div
      style={{
        marginTop: "25dvh",
        display: "flex",
        justifyContent: "center"
      }}
    >

      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "80px"
        }}
      >
        <button
          onClick={() => navigate("/history")}
          style={{
            height: "46px",
            padding: "0 24px",
            borderRadius: "28px",
            border: "none",
            cursor: "pointer",
            background:
              "linear-gradient(99.18deg,#8F64E1 -46.89%,#1D68BD 223.45%)",
            fontFamily: "Sora",
            fontWeight: 600,
            fontSize: "14px",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          👁 View Poll history
        </button>
      </div>

      <PageContainer maxWidth={1100}>

        <div className="row g-4">

          <div className="col-md-8">

            <div
              style={{
                position: "relative",
                width: "fit-content"
              }}
            >

              <PollCard
                question={poll.question}
                startTime={poll.startTime}
                duration={poll.duration}
              >

                {!ended && (
                  <PollResults options={poll.options} />
                )}

                {ended && (

                  <PollResults
                    options={results.map((r): PollOption => ({
                      id: r.optionId,
                      text: r.text,
                      votes: r.votes,
                      correct: r.isCorrect
                    }))}
                    showCorrect
                  />

                )}

              </PollCard>

              {ended && (
                <button
                  onClick={() => navigate("/teacher")}
                  style={{
                    position: "absolute",
                    right: "0",
                    bottom: "-80px",
                    width: "260px",
                    height: "57.58px",
                    borderRadius: "34px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      "linear-gradient(99.18deg,#8F64E1 -46.89%,#1D68BD 223.45%)",
                    fontFamily: "Sora",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  + Ask a new question
                </button>
              )}

            </div>

          </div>

        </div>

        <ChatButton onClick={() => setChatOpen(prev => !prev)} />

        <FloatingChatPanel
          open={chatOpen}
          participants={participants}
          pollId={poll.id}
          senderName="Teacher"
          senderRole="TEACHER"
          showKick
          onKick={kickStudent}
        />

      </PageContainer>

    </div>

  )

}

export default TeacherLiveResultsPage