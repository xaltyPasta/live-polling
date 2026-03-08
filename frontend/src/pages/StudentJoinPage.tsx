import { useState } from "react"
import { useNavigate } from "react-router-dom"

import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"
import GradientButton from "../components/common/GradientButton"

function StudentJoinPage() {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleContinue = () => {
    if (!name.trim()) return

    sessionStorage.setItem("username", name)
    sessionStorage.setItem("sessionId", crypto.randomUUID())

    navigate("/student/wait")


  }

  return (
    <div style={{
      marginTop: 81
    }}>
      <PageContainer maxWidth={520}>
        <PageHeader
          title={
            <>
              Let's{" "}
              <span style={{
                fontWeight: 600
              }}>Get Started</span>
            </>
          }
          subtitle={
            <>
              If you're a student, you'll be able to{" "}
              <span style={{ fontWeight: 600, color: "#000" }}>
                submit your answers
              </span>
              , participate in live polls, and see how your responses compare with your classmates
            </>
          }
        />

        <div style={{ marginTop: "40px", justifyContent: "left" }}>
          <label
            style={{
              fontWeight: 500,
              marginBottom: "8px",
              display: "block",
              textAlign: "left"
            }}
          >
            Enter your Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "30px",
              background: "#F2F2F2",
            }}
          />

          <div style={{ textAlign: "center" }}>
            <GradientButton
              label="Continue"
              onClick={handleContinue}
              disabled={!name.trim()}
            />
          </div>
        </div>
      </PageContainer>
    </div>
  )
}

export default StudentJoinPage
