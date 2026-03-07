import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"

function KickedPage() {
    return (
        <PageContainer maxWidth={520}>
            <PageHeader
                title="You've been kicked out"
                subtitle="The teacher has removed you from this session."
            />

            <div
                style={{
                    marginTop: "40px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                }}
            >
                Please contact the teacher if you believe this was a mistake.
            </div>
        </PageContainer>
    )
}

export default KickedPage