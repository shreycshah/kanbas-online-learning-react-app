import { useEffect, useState } from "react"

export default function TrueFalse({question, updateQuestions, index}:{question:any,updateQuestions:any, index:number}){
    const[answer,setAnswer] = useState(question?.answer)
    useEffect(()=>{
        setAnswer(question?.answer)
    },[question])
    const handleAnswerChange=(e:any)=>{
        const newquestion = {...question,answer:e.target.value }
        updateQuestions(newquestion, index)

    }
    return(
        <div className="align-items-center border border-dark rounded-1">
            <div className="d-flex justify-content-start p-3 bg-secondary border border-dark rounded-1">
              {question.title}
            </div>
            <div className="p-3">
              <div>
                {question.question}
              </div>
            </div>
            <hr></hr>
            <div className="p-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value = "true"
                  id="tfTrue"
                  checked={answer == "true"}
                  onChange={handleAnswerChange}
                />
                <label className="form-check-label" htmlFor="tfTrue">
                  True
                </label>
              </div>
              <hr />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value = "false"
                  id="tfFalse"
                  checked={answer == "false"}
                  onChange={handleAnswerChange}
                />
                <label className="form-check-label" htmlFor="tfFalse">
                  False
                </label>
              </div>
            </div>
          </div>
    )
}