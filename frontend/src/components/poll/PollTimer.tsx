import { useEffect, useState } from "react"

interface Props {
    startTime: number
    duration: number
}

function PollTimer({ startTime, duration }: Props) {
    const [remaining, setRemaining] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now()
            const elapsed = Math.floor((now - startTime) / 1000)
            const left = duration - elapsed
            setRemaining(left > 0 ? left : 0)
        }, 1000)

        return () => clearInterval(interval)
    }, [startTime, duration])

    return (
        <div style={{ fontWeight: 500 }}>
            ⏱ {remaining}s
        </div>
    )
}

export default PollTimer