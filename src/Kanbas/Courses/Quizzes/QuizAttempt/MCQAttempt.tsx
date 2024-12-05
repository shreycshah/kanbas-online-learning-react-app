import { useEffect, useState } from "react"

export default function MCQ({ question, updateQuestions, index}: { question: any, updateQuestions:any, index:any }) {
    const[answer,setAnswer] = useState(question?.answer)
    useEffect(()=>{
        setAnswer(question?.answer)
    },[question])
    const handleAnswerChange=(e:any)=>{
        const newquestion = {...question,answer:e.target.value }
        updateQuestions(newquestion, index)

    }

  return (
    <div className="align-items-center border border-dark rounded-1">
      <div className="d-flex justify-content-start p-3 bg-secondary border border-dark rounded-1">
        {question.title}
      </div>
      <div className="p-3">
        <div>{question.question}</div>
      </div>
      <hr></hr>
      <div className="p-3">
        {question.choices.map((choice: any, index: number) => {
          return (
            <div>
              <div className="form-check">
              <label className="form-check-label" htmlFor={"MCQ"+index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={"flexRadioDefault"}
                  id={"MCQ"+index}
                  value= {choice.answer}
                  onChange={handleAnswerChange}
                  checked = {answer == choice.answer}
                />
                  {choice.answer}
                </label>
              </div>
              {index < question.choices.length-1 ? <hr />:<></>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
