import { useEffect, useState } from "react"

import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"

import { getPollHistory } from "../services/poll.service"
import type { Poll } from "../types/poll.types"

function PollHistoryPage() {
    const [polls, setPolls] = useState<Poll[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadHistory() {
            try {
                const data = await getPollHistory()
                setPolls(data)
            } finally {
                setLoading(false)
            }
        }

        loadHistory()
    }, [])

    if (loading) {
        return (
            <PageContainer maxWidth={700}>
                <PageHeader title="Poll History" />
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    Loading...
                </div>
            </PageContainer>
        )
    }

    return (
        <PageContainer maxWidth={700}>
            <PageHeader title="Poll History" />

            <div style={{ marginTop: "30px" }}>
                {polls.map((poll) => (
                    <div key={poll.id} style={{ marginBottom: "24px" }}>
                        <PollCard question={poll.question}>
                            <PollResults options={poll.options} showCorrect />
                        </PollCard>
                    </div>
                ))}
            </div>
        </PageContainer>
    )
}

export default PollHistoryPage