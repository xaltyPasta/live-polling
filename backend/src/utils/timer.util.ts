export function getRemainingTime(
    startTime: Date,
    duration: number
) {

    const elapsed =
        (Date.now() - new Date(startTime).getTime()) / 1000

    const remaining = duration - elapsed

    return remaining > 0 ? Math.floor(remaining) : 0
}