import React, { useEffect, useState } from 'react';

export default function TrueFalseEditor({questionText, setQuestionText, answer, setAnswer,reset}:{questionText:string, setQuestionText:any,answer:boolean, setAnswer:any, reset:any}) {
    const [selectedAnswer, setSelectedAnswer] = useState<string>(answer?"true":"false"); // Track the selected answer
    const [localQuestion, setLocalQuestion] = useState(questionText)
    // console.log("updats questionP:",questionText)
    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(e.target.value); // Update the selected answer
        setAnswer(e.target.value=="true"?true:false)

    };
    useEffect(()=>{
        setQuestionText(localQuestion)
        setAnswer(selectedAnswer == "true"?true:false)
    },[selectedAnswer, localQuestion])
    
    useEffect(()=>{
        setSelectedAnswer(answer?"true":"false")   
        setLocalQuestion(questionText) 
    },[reset])

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
                value = {localQuestion}
                onChange={(e)=>{setLocalQuestion(e.target.value)}}
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
