import { useEffect, useState } from "react"

import PageContainer from "../components/layout/PageContainer"
import PageHeader from "../components/common/PageHeader"
import PollCard from "../components/poll/PollCard"
import PollResults from "../components/poll/PollResults"

import { getPollHistory } from "../services/poll.service"
import type { Poll } from "../types/poll.types"
import SpinnerWidget from "../components/common/SpinnerWidget"

function PollHistoryPage() {
    const [polls, setPolls] = useState<Poll[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPollHistory()
            .then(setPolls)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div style={{
                marginTop: "25dvh"
            }}>
                <PageContainer maxWidth={700}>
                    <PageHeader title="Poll History" />
                    <SpinnerWidget/>
                    <div className="common-text-style">
                        Loading...
                    </div>
                </PageContainer>
            </div>
        )
    }

    return (
        <div style={{
            marginTop: "10dvh"
        }}>
            <PageContainer maxWidth={700}>
                <PageHeader title=" View Poll History" />

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
        </div>
    )
}

export default PollHistoryPage