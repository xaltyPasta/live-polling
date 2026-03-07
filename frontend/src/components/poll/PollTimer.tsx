import { useEffect, useState } from "react"

interface Props {
    startTime: number
    duration: number
}

function PollTimer({ startTime, duration }: Props) {
    const [remaining, setRemaining] = useState(duration)

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000)
            const left = duration - elapsed

            setRemaining(left > 0 ? left : 0)
        }, 1000)

        return () => clearInterval(interval)
    }, [startTime, duration])

    return (
        <div
            style={{
                fontWeight: 600,
                marginBottom: "12px",
                color: "var(--primary-purple)"
            }}
        >
            ⏱ {remaining}s
        </div>
    )
}

export default PollTimer