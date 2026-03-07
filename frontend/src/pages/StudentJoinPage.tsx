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

    navigate("/student/wait")
  }

  return (
    <PageContainer maxWidth={520}>
      <PageHeader
        title="Let's Get Started"
        subtitle="Enter your name to join the live polling session"
      />

      <div style={{ marginTop: "40px" }}>
        <label
          style={{
            fontWeight: 500,
            marginBottom: "8px",
            display: "block",
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
  )
}

export default StudentJoinPage
