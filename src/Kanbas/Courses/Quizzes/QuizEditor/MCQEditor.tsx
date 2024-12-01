import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function MCQEditor() {
    const [possibleAnswers, setPossibleAnswers] = useState<any[]>([{answer:"answer1",isCorrect:false}]);
    const [correctAnswer, setcorrectAnswer] = useState(-1)
    const addAnswer = ()=>{
        setPossibleAnswers([...possibleAnswers, {answer:"answer1",isCorrect:false}])
    }
    const [isHovered, setIsHovered] = useState<number>(-1);
    const handleMouseEnter = (index:number) => {
        setIsHovered(index);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(-1);
      };
      const toggleAnswerCorrectness = (index:number)=>{
        setcorrectAnswer(index)
      }
      const deleteAnswer = (ind:number)=>{
        const newAnswers = possibleAnswers.filter((answer,index)=>index != ind)
        setPossibleAnswers([...newAnswers])
      }
      const updateAnswer = (index:number, answer:string)=>{
        const newAnswers = possibleAnswers
        newAnswers[index].answer = answer
        setPossibleAnswers([...newAnswers])
      }
    return (
    <div>
      <p>
        Enter your question and multiple answers, then select the one correct
        answer
      </p>
      <h5>Question:</h5>
      <textarea
        id="wd-description"
        className=" form-control border border-dark rounded-1  mt-2"
        rows={4}
      >
        {" "}
      </textarea>
      <br />
      <h5>Answers:</h5>
      <div>
      {possibleAnswers.map((answer, index) => (
          <div className={isHovered==index? "d-flex align-items-center mt-3 border border-secondary rounded-1 pt-3 pb-3":"d-flex align-items-center mt-3"}
          onMouseEnter={()=>handleMouseEnter(index)}
          onMouseLeave={()=>handleMouseLeave()}
            >
            
          {isHovered == index ? 
          answer.isCorrect?<FaCheck className="text-success ms-2" onClick={()=>{toggleAnswerCorrectness(index)}}/>:<FaCheck className="text-secondary ms-2" onClick={()=>{toggleAnswerCorrectness(index)}}/>
           : correctAnswer == index && <FaCheck className="text-success ms-2"/>}
            <label htmlFor="wd-question-pts" className={correctAnswer == index || isHovered == index?"form-label ms-4 me-2":"form-label ms-5 me-2"}>
              Possible Answer{" "}
            </label>
            <input
              id="wd-question-pts"
              className="form-control"
              value={answer.answer}
              style={{ width: "50%" }}
              onChange={(e)=>{isHovered == index && updateAnswer(index, e.target.value)}}
            ></input>
            {isHovered ==  index && <LuPencil className="ms-auto me-1"/>}
            {isHovered == index && <MdOutlineDeleteOutline  className="ms-1 me-3" onClick={()=>deleteAnswer(index)}/>}
          </div>
        ))}
        
        <br/>
        <div className="d-flex justify-content-end align-items-center pt-3 pb-3">
        <button className=" btn btn-link p-0 m-0 text-decoration-none text-danger" onClick={()=>addAnswer()}> + Add another answer</button>
        </div>
        
      </div>
    </div>
  );
}
