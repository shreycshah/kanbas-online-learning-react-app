import { useState } from "react";
import NewQuestionButton from "./NewQuestionsButton";
import QuestionParentForm from "./QuestionParentForm";
 
export default function QuestionsEditor()
{
   
    const [questions, setQuestions] = useState<string[]>([]);
 
    const addQuestion = ()=>{
        setQuestions([...questions,"mcq"])
    }
    return(
        <div>
            {questions.map((question, index) => (
          <div className="d-flex justify-content-center align-items-center mt-2">
          <QuestionParentForm/>
      </div>
        ))}
           
        <div className="d-flex justify-content-center align-items-center mt-2">
            <NewQuestionButton callback={addQuestion} />
        </div>
        </div>
       
       
    )
}