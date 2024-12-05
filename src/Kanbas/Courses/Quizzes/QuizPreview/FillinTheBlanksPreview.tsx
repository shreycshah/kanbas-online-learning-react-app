import { useEffect, useState } from "react"

export default function FillInTheBlanks({question, updateQuestions, index}:{question:any,updateQuestions:any, index:number}){
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
              id="wd-question-pts"
              placeholder = "your answer"
              className="form-control"
              style={{ width: "50%" }}
              value={answer}
              onChange={handleAnswerChange}
            ></input>
            </div>
          </div>
          </div>
    )
}