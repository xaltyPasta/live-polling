import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"
import CreatePollForm from "../components/teacher/CreatePollForm"
import { useNavigate } from "react-router-dom"

function TeacherCreatePollPage() {
    const navigate = useNavigate()
    
    return (
        <PageContainer maxWidth={720}>
            <PageHeader
                title="Let's Get Started"
                subtitle="Create and manage live polls"
            />

            <CreatePollForm />
            <button
                onClick={() => navigate("/history")}
                style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--primary-purple)",
                    marginBottom: "20px",
                    cursor: "pointer",
                }}
            >
                View Poll History
            </button>
        </PageContainer>
    )
}

export default TeacherCreatePollPage