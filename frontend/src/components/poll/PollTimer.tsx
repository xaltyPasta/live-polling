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

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60

        const mm = String(minutes).padStart(2, "0")
        const ss = String(secs).padStart(2, "0")

        return `${mm}:${ss}`
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "Sora",
                fontWeight: 600,
                fontSize: "16px",
                color: "#E53935"
            }}
        >
            <span>⏱</span>
            <span>{formatTime(remaining)}</span>
        </div>
    )
}

export default PollTimer