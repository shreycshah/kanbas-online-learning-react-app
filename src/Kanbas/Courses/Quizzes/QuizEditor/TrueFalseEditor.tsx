import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";

export default function TrueFalseEditor() {
    const [selectedAnswer, setSelectedAnswer] = useState<string>(''); // Track the selected answer

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(e.target.value); // Update the selected answer
    };

    return (
        <div>
            <p>
                Enter your question text, then select if True or False is the answer.
            </p>
            <h5>Question:</h5>
            <textarea
                id="wd-description"
                className="form-control border border-dark rounded-1 mt-2"
                rows={4}
            >
                {" "}
            </textarea>
            <br />
            <h5>Answers:</h5>
            <div>
                <div className="d-flex align-items-center">
                    <label className="me-3">
                        <input
                            type="radio"
                            name="trueFalse"
                            value="true"
                            checked={selectedAnswer === 'true'}
                            onChange={handleAnswerChange}
                        />
                        True
                    </label>
                    <label className="ms-3">
                        <input
                            type="radio"
                            name="trueFalse"
                            value="false"
                            checked={selectedAnswer === 'false'}
                            onChange={handleAnswerChange}
                        />
                        False
                    </label>
                </div>
            </div>
        </div>
    );
}
