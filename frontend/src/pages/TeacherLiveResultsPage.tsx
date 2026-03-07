import { useEffect, useState } from "react"

import PageContainer from "../components/layout/PageContainer"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"
import RightSidebar from "../components/layout/RightSidebar"

import { useSocket } from "../hooks/socket"
import type { Poll } from "../types/poll.types"
import type { Participant } from "../types/session.types"

function TeacherLiveResultsPage() {
  const socket = useSocket()

  const [poll, setPoll] = useState<Poll | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    socket.on("poll:created", (data: Poll) => {
      setPoll(data)
    })

    socket.on("poll:update", (data: Poll) => {
      setPoll(data)
    })

    socket.on("participants:update", (data: Participant[]) => {
      setParticipants(data)
    })

    return () => {
      socket.off("poll:created")
      socket.off("poll:update")
      socket.off("participants:update")
    }
  }, [socket])

  const kickStudent = (sessionId: string) => {
    socket.emit("teacher:remove_student", { sessionId })
  }

  if (!poll) return null

  return (
    <PageContainer maxWidth={1100}>
      <div className="row g-4">
        <div className="col-md-8">
          <PollCard question={poll.question}>
            <PollResults options={poll.options} />
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
