import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"

import { useSocket } from "../hooks/socket"

function StudentWaitingPage() {
  const socket = useSocket()
  const navigate = useNavigate()

  useEffect(() => {
    const username = sessionStorage.getItem("username")

    socket.emit("student:join", { username })

    socket.on("poll:created", () => {
      navigate("/student/vote")
    })

    socket.on("student:removed", () => {
      navigate("/kicked")
    })

    return () => {
      socket.off("poll:created")
      socket.off("student:removed")
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
          textAlign: "center",
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
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    </PageContainer>
  )
}

export default StudentWaitingPage