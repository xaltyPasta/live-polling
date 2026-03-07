import { useEffect, useState } from "react"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"
import PollTimer from "../components/poll/PollTimer"
import RightSidebar from "../components/layout/RightSidebar"

import { useSocket } from "../hooks/socket"

import type { Poll } from "../types/poll.types"
import type { Participant } from "../types/session.types"

interface PollEndResult {
  optionId: string
  text: string
  votes: number
  percentage: number
  isCorrect: boolean
}

function TeacherLiveResultsPage() {

  const socket = useSocket()

  const [poll, setPoll] = useState<Poll | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [results, setResults] = useState<PollEndResult[]>([])
  const [ended, setEnded] = useState(false)

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

      setPoll((prev) => {

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

  // Restore poll state on refresh
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
      <PageContainer min-Width={700}>
        <div style={{ textAlign: "center" }}>
          Waiting for poll data...
        </div>
      </PageContainer>
    )

  }

  return (

    <PageContainer min-Width={1100}>

      <div className="row g-4">

        <div className="col-md-8">

          <PollCard question={poll.question}>

            {!ended && (
              <PollTimer
                startTime={poll.startTime}
                duration={poll.duration}
              />
            )}

            {!ended && (
              <PollResults options={poll.options} />
            )}

            {ended && (

              <div>

                {results.map((r) => (

                  <div
                    key={r.optionId}
                    style={{ marginBottom: 12 }}
                  >

                    <strong>
                      {r.text} {r.isCorrect ? "✓" : ""}
                    </strong>

                    <div>
                      {r.votes} votes ({r.percentage}%)
                    </div>

                  </div>

                ))}

              </div>

            )}

          </PollCard>

        </div>

        <div className="col-md-4">

          <RightSidebar
            participants={participants}
            onKick={kickStudent}
          />

        </div>

      </div>

    </PageContainer>

  )

}

export default TeacherLiveResultsPage