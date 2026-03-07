import { useState, useEffect } from "react"
import OptionEditor from "./OptionEditor"

interface Props {
    onChange: (data: any) => void
}

function CreatePollForm({ onChange }: Props) {

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

    useEffect(() => {
        onChange({
            question,
            duration,
            options: options.map((o, i) => ({
                text: o,
                correct: i === correctIndex,
            })),
        })
    }, [question, duration, options, correctIndex])

    return (
        <div style={{ width: 865 }}>

            {/* Question header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                }}
            >
                <label style={{ fontWeight: 600, fontSize: 20 }}>
                    Enter your question
                </label>

                <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={{
                        width: 170,
                        height: 43,
                        background: "#F1F1F1",
                        border: "none",
                        borderRadius: 7,
                        paddingLeft: 12,
                        fontSize: 18,
                    }}
                >
                    <option value={30}>30 seconds</option>
                    <option value={60}>60 seconds</option>
                    <option value={90}>90 seconds</option>
                </select>
            </div>

            {/* Question textarea */}
            <textarea
                maxLength={100}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                    width: 865,
                    height: 174,
                    background: "#F2F2F2",
                    border: "none",
                    borderRadius: 2,
                    padding: 20,
                    fontSize: 18,
                    resize: "none",
                }}
            />

            <div style={{ textAlign: "right", marginTop: 6 }}>
                {question.length}/100
            </div>

            {/* Options */}
            <div style={{ marginTop: 40, fontWeight: 600 }}>
                Edit Options
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

            <button
                onClick={addOption}
                style={{
                    width: 169,
                    height: 45,
                    borderRadius: 11,
                    border: "1px solid #7451B6",
                    background: "transparent",
                    color: "#7C57C2",
                    fontWeight: 600,
                    marginTop: 20,
                }}
            >
                + Add More option
            </button>

        </div>
    )
}

export default CreatePollForm