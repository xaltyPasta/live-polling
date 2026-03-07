export interface PollOption {
    id: string
    text: string
    votes: number
    correct?: boolean
}

export interface Poll {
    id: string
    question: string
    options: PollOption[]
    startTime: number
    duration: number
}