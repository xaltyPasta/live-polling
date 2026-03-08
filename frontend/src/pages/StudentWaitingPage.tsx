import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"
import { useSocket } from "../hooks/socket"
import SpinnerWidget from "../components/common/SpinnerWidget"

interface PollStatePayload {
  poll: any | null
}

function StudentWaitingPage() {
  const socket = useSocket()
  const navigate = useNavigate()

  const joinPoll = () => {
    const name = sessionStorage.getItem("username")
    const sessionId = sessionStorage.getItem("sessionId")

    console.log("joining poll", name, sessionId)

    socket.emit("student:join", { name, sessionId })
  }

  const handlePollCreated = () => {
    navigate("/student/vote")
  }

  const handlePollState = (payload: PollStatePayload) => {
    if (payload?.poll) {
      navigate("/student/vote")
    }
  }

  useEffect(() => {
    if (!socket) return

    joinPoll()

    if (socket.connected) {
      joinPoll()
    } else {
      socket.once("connect", joinPoll)
    }

    socket.on("poll:created", handlePollCreated)
    socket.on("poll:state", handlePollState)

    return () => {
      socket.off("poll:created", handlePollCreated)
      socket.off("poll:state", handlePollState)
    }
  }, [socket, navigate])

  return (
    <div style={{
      marginTop: "25dvh"
    }}>
      <PageContainer maxWidth={900}>
        <PageHeader />

        <div
          style={{
            marginTop: "40px",
            textAlign: "center"
          }}
        >
          <SpinnerWidget/>
        </div>


        <div style={{ textAlign: "center", marginTop: 30 }}>
          <p className="common-text-style"
          >
            Wait for the teacher to ask questions..
          </p>
        </div>

      </PageContainer>

    </div>
  )
}

export default StudentWaitingPage