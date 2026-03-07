import { useState } from "react"
import { useSocket } from "../../hooks/socket"
import OptionEditor from "./OptionEditor"
import GradientButton from "../common/GradientButton"
import { useNavigate } from "react-router-dom"

function CreatePollForm() {
    const socket = useSocket()
    const navigate = useNavigate()

    const [question, setQuestion] = useState("")
    const [duration, setDuration] = useState(60)
    const [options, setOptions] = useState(["", ""])
    const [correctIndex, setCorrectIndex] = useState<number | null>(null)

    const updateOption = (index: number, value: string) => {
        const updated = [...options]
        updated[index] = value
        setOptions(updated)
    }

    const addOption = () => {
        setOptions([...options, ""])
    }

    const createPoll = () => {
        if (!question || correctIndex === null) return

        socket.emit("teacher:create_poll", {
            question,
            duration,
            options: options.map((o, i) => ({
                text: o,
                correct: i === correctIndex,
            })),
        })

        navigate("/teacher/live")
    }

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <label>Enter your question</label>

                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        marginTop: "6px",
                    }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label>Duration (seconds)</label>

                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        marginTop: "6px",
                    }}
                />
            </div>

            <div style={{ marginBottom: "16px" }}>
                <label>Edit Options</label>
            </div>

            {options.map((o, i) => (
                <OptionEditor
                    key={i}
                    value={o}
                    index={i}
                    correctIndex={correctIndex}
                    onChange={updateOption}
                    onSelectCorrect={setCorrectIndex}
                />
            ))}

            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={addOption}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--primary-purple)",
                        cursor: "pointer",
                    }}
                >
                    + Add option
                </button>
            </div>

            <GradientButton label="Ask Question" onClick={createPoll} />
        </div>
    )
}

export default CreatePollForm