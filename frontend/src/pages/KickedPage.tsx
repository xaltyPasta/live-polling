import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"

function KickedPage() {
    return (
        <div style={{
            marginTop:"25dvh"
        }}>
            <PageContainer maxWidth={520}>
            <PageHeader
                title="You've been kicked out !"
            />

            <div
                style={{
                    marginTop: "10px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                }}
            >
                Looks like the teacher had removed you from the poll system. Please try again after sometime
            </div>
        </PageContainer>
        </div>
    )
}

export default KickedPage