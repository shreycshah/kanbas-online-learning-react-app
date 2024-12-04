import { useEffect, useState } from "react";
import NewQuestionButton from "./NewQuestionsButton";
import QuestionParentForm from "./QuestionParentForm";

export default function QuestionsEditor({questions, setQuestions, reset}:{questions:any, setQuestions:any, reset:boolean}) {

    // const [questions, setQuestions] = useState<string[]>([]);
    // ("List of Questions:",questions)
    const [res, setRes] = useState(reset) 
    const [localQuestions, setLocalQuestions] = useState<any[]>([...questions]);
    const addQuestion = () => {
        const newQuestion = {
            "type": "mcq",
            "title":"",
            "points":0,
            "question": "",
            "choices":[],
            "answer":false,
            "possibleAnswers":[],
        }
        setLocalQuestions([...localQuestions, newQuestion])
    }
    // useEffect(()=>{
    //     setQuestions([...localQuestions])
    // },[])
    useEffect(()=>{
        setQuestions([...localQuestions])
    },[localQuestions])
    const updateState = (question:any, index:number)=>{
        const tempQuestions = localQuestions
        tempQuestions[index] = question 
        setLocalQuestions([...tempQuestions])
    }
    useEffect(()=>{
        setLocalQuestions([...questions])
        setRes(!res)
    },[reset])
    return (
        <div>
            {localQuestions.map((question, index) => (
                <div className="d-flex justify-content-center align-items-center mt-2">
                    <QuestionParentForm question={question} index={index} updateState={updateState} reset={res} />
                </div>
            ))}
            <div className="d-flex justify-content-center align-items-center mt-2">
                <NewQuestionButton callback={addQuestion} />
            </div>
        </div>
    )
}