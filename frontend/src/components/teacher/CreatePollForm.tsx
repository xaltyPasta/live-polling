import { useState, useEffect } from "react"
import OptionEditor from "./OptionEditor"

interface Props {
    onChange: (data: any) => void
}

function CreatePollForm({ onChange }: Props) {

    const [question, setQuestion] = useState("")
    const [duration, setDuration] = useState(60)

    const [options, setOptions] = useState(["", ""])
    const [correctOptions, setCorrectOptions] = useState<boolean[]>([false, false])

    const updateOption = (index: number, value: string) => {
        const updated = [...options]
        updated[index] = value
        setOptions(updated)
    }

    const toggleCorrect = (index: number, value: boolean) => {
        const updated = [...correctOptions]
        updated[index] = value
        setCorrectOptions(updated)
    }

    const addOption = () => {
        setOptions([...options, ""])
        setCorrectOptions([...correctOptions, false])
    }

    const deleteOption = (index: number) => {
        if (options.length <= 2) return

        const newOptions = options.filter((_, i) => i !== index)
        const newCorrect = correctOptions.filter((_, i) => i !== index)

        setOptions(newOptions)
        setCorrectOptions(newCorrect)
    }

    useEffect(() => {
        onChange({
            question,
            duration,
            options: options.map((o, i) => ({
                text: o,
                correct: correctOptions[i] ?? false,
            })),
        })
    }, [question, duration, options, correctOptions])

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
                    <option value={360}>360 seconds</option>
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
            <div
                style={{
                    display: "flex",
                    marginTop: 40,
                    alignItems: "center"
                }}
            >
                <div style={{ fontWeight: 600, width: 545 }}>
                    Edit Options
                </div>

                <div style={{ fontWeight: 600 , marginLeft: 40}}>
                    Is it Correct?
                </div>
            </div>

            {options.map((o, i) => (
                <OptionEditor
                    key={i}
                    value={o}
                    index={i}
                    isCorrect={correctOptions[i]}
                    onChange={updateOption}
                    onToggleCorrect={toggleCorrect}
                    onDelete={deleteOption}
                />
            ))}

            <button
                onClick={addOption}
                style={{
                    width: 169,
                    height: 45,
                    marginLeft: 40,
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "left",
                    gap: 10,
                    padding: 10,
                    border: "1px solid #7451B6",
                    borderRadius: 11,
                    background: "transparent",
                    fontFamily: "Sora",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#7C57C2",
                    cursor: "pointer"
                }}
            >
                + Add More option
            </button>

        </div>
    )
}

export default CreatePollForm