import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"
import { useSocket } from "../hooks/socket"

interface PollStatePayload {
  poll: any | null
}

function StudentWaitingPage() {
  const socket = useSocket()
  const navigate = useNavigate()

  const joinPoll = () => {
    const name = sessionStorage.getItem("username")
    const sessionId = sessionStorage.getItem("sessionId")

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
    joinPoll()

    socket.on("poll:created", handlePollCreated)
    socket.on("poll:state", handlePollState)

    return () => {
      socket.off("poll:created", handlePollCreated)
      socket.off("poll:state", handlePollState)
    }
  }, [socket, navigate])

  return (
    <PageContainer maxWidth={520}>
      <PageHeader
        title="You're all set!"
        subtitle="Wait for the teacher to ask questions.."
      />

      <div
        style={{
          marginTop: "40px",
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "5px solid #e5e5e5",
            borderTop: "5px solid var(--primary-purple)",
            borderRadius: "50%",
            margin: "auto",
            animation: "spin 1s linear infinite"
          }}
        />
      </div>
    </PageContainer>
  )
}

export default StudentWaitingPage