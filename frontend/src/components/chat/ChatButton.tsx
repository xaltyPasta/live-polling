interface Props {
    onClick?: () => void
}

function ChatButton({ onClick }: Props) {
    return (
        <button className="chat-button" onClick={onClick}>
            <svg
                width="39"
                height="39"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* This path points to the bottom-right */}
                <path d="M3 15a4 4 0 0 0 4 4h9l5 3V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4z" />
            </svg>
        </button>
    )
}

export default ChatButton