import AnswerTypeElement from "./answerTypeElement"

export default function MarkedAnswerFillInTheBlanks({markedAnswer}:{markedAnswer:any}){
    let wrongAnswer = <></>
    if(!markedAnswer.possibleAnswers.includes(markedAnswer.markedAnswer)){
        wrongAnswer = <div><hr/><div className="d-flex align-items-center ">
        {/* <div className=" fw-bold text-white bg-success d-flex align-items-center border border-dark rounded-1 p-2 ps-3 pe-3">Correct !</div>  */}
        <div className="col-3">
          {" "}
          <AnswerTypeElement
            text={"You Answered"}
            color={"btn-danger"}
          />{" "}
        </div>
        <div className="col-9 p-2">
          {" "}
          <label className="w-100 ps-1">
            {markedAnswer.markedAnswer}
          </label>
        </div>
      </div></div>
    }
    return(
        
        markedAnswer.possibleAnswers.map((option:any)=>{
            return <div>
                {wrongAnswer}
                <hr/>
            <div className="d-flex align-items-center ">
            {/* <div className=" fw-bold text-white bg-success d-flex align-items-center border border-dark rounded-1 p-2 ps-3 pe-3">Correct !</div>  */}
            <div className="col-3">
              {" "}
              <AnswerTypeElement
                text={markedAnswer.markedAnswer == option?"Correct!":"Correct Answer"}
                color={markedAnswer.markedAnswer == option?"btn-success":"btn-secondary"}
              />{" "}
            </div>
            <div className="col-9 p-2">
              {" "}
              <label className="w-100 ps-1">
                {option}
              </label>
            </div>
          </div>
          </div>
        })
    )
}