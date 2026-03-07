import { useState } from "react"
import { useNavigate } from "react-router-dom"

import PageHeader from "../components/common/PageHeader"
import RoleCard from "../components/common/RoleCard"
import GradientButton from "../components/common/GradientButton"
import PageContainer from '../components/layout/PageContainer';

function LandingPage() {
    const [role, setRole] = useState<"student" | "teacher" | null>(null)
    const navigate = useNavigate()

    const handleContinue = () => {
        if (role === "student") navigate("/student")
        if (role === "teacher") navigate("/teacher")
    }

    return (
        <PageContainer align="center">

            <PageHeader
                title="Welcome to the Live Polling System"
                subtitle="Please select the role that best describes you to begin using the live polling system"
            />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px",
                    marginTop: "40px",
                    marginBottom: "60px",
                    flexWrap: "wrap",
                }}
            >
                <RoleCard
                    title="I'm a Student"
                    description="Submit answers and participate in live polls"
                    selected={role === "student"}
                    onClick={() => setRole("student")}
                />

                <RoleCard
                    title="I'm a Teacher"
                    description="Create polls and monitor responses in real time"
                    selected={role === "teacher"}
                    onClick={() => setRole("teacher")}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <GradientButton
                    label="Continue"
                    onClick={handleContinue}
                    disabled={!role}
                />
            </div>

        </PageContainer>
    )
}

export default LandingPage