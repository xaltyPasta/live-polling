import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"
import CreatePollForm from "../components/teacher/CreatePollForm"
import GradientButton from "../components/common/GradientButton"
import { useSocket } from "../hooks/socket"

function TeacherCreatePollPage() {
    const socket = useSocket()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<any>(null)

    const handleSubmit = () => {
        if (!formData) return

        socket.emit("teacher:create_poll", formData)
        navigate("/teacher/live")
    }

    return (
        <>
            <div style={{
                paddingTop: 81
            }}>
                <PageContainer align="start">

                    <PageHeader 
                        title="Let's Get Started"
                        subtitle="You'll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time."
                    />

                    <CreatePollForm onChange={setFormData} />

                </PageContainer>
            </div>

            {/* bottom action bar */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    borderTop: "1px solid #B6B6B6",
                    background: "white",
                    padding: "20px 40px",
                    display: "flex",
                    justifyContent: "flex-end",
                    zIndex: 100,
                }}
            >
                <GradientButton
                    label="Ask Question"
                    onClick={handleSubmit}
                />
            </div>
        </>
    )
}

export default TeacherCreatePollPage