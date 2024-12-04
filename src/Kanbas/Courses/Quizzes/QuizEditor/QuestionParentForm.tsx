import React, { useEffect, useState } from 'react';
import MCQEditor from "./MCQEditor";
import TrueFalseEditor from "./TrueFalseEditor"; // Import TrueFalse component
import FillInTheBlankEditor from "./FillInTheBlankEditor"; // Import FillInTheBlanks component

export default function QuestionParentForm({question, index, updateState, reset}:{question:any, index:number, updateState:any, reset:any}) {
  const [selectedType, setSelectedType] = useState<string>(''); // Default to 'Multiple Choice'

  const [res, setRes] = useState(reset)
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value); // Update selected question type
  };

  const [title, setTitle] = useState("")
  const [points, setPoints] = useState("")
  const [questionText, setQuestionText] = useState("")
  const [choices, setChoices] = useState<any[]>([])
  const [answer, setAnswer] = useState(false)
  const [possibleAnswers, setPossibleAnswers] = useState<any[]>([])

  const updateQuestion = ()=>{
    console.log("newData: ",{
      title,
      points,
      answer,
      "question":questionText,
      choices,
      possibleAnswers,
      "type":selectedType
    })
    updateState({
      title,
      points,
      answer,
      "question":questionText,
      choices,
      possibleAnswers,
      "type":selectedType
    }, index)
  }
   useEffect(()=>{
    console.log("updating details ",question)
    setSelectedType(question.type)
    setTitle(question.title)
    setPoints(question.points)
    setQuestionText(question.question)
    setChoices([...question.choices])
    setAnswer(answer)
    setPossibleAnswers([...question.possibleAnswers])
   },[question])
   
   useEffect(()=>{
    setRes(reset)
   },[reset])
  const renderComponent = () => {
    switch (selectedType) {
      case 'tf':
        return <TrueFalseEditor questionText={questionText} setQuestionText={setQuestionText} answer={answer} setAnswer={setAnswer} reset={res}/>;
      case 'fib':
        return <FillInTheBlankEditor questionText={questionText} setQuestionText={setQuestionText} possibleAnswers={possibleAnswers} setPossibleAnswers={setPossibleAnswers} reset={res}/>;
      case 'mcq':
      default:
        return <MCQEditor questionText={questionText} setQuestionText={setQuestionText} choices={choices} setChoices={setChoices} reset={res}/>;
    }
  };

  return (
    <div className="border border-dark rounded-1 p-3 mt-3">
      <div className="d-flex justify-content-center align-items-center mt-2">
        <input
          id="wd-question-title"
          placeholder='Question Title'
          className="form-control me-1 border border-secondary"
          value = {title}
          onChange={(e)=>{setTitle(e.target.value)}}
        />
        <select
          id="wd-question-group"
          className="form-select ms-1 me-5 border border-secondary"
          value={selectedType} // Bind the select element to the state
          onChange={handleChange} // Handle the change event
        >
          <option value="mcq">Multiple Choice</option>
          <option value="tf">True or False</option>
          <option value="fib">Fill in the Blanks</option>
        </select>
        <label htmlFor="wd-question-pts" className="form-label ms-5">
          pts:
        </label>
        <input
          id="wd-question-pts"
          className="form-control"
          value={points}
          style={{ width: '60px' }}
          onChange={(e)=>{setPoints(e.target.value)}}
        />
      </div>
      <hr />
      {renderComponent()} 
      <hr />
      <div className="d-flex">
        <button
          id="wd-add-assignment-group"
          className="text-nowrap btn btn-secondary mt-2 ms-2"
        >
          Cancel
        </button>
        <button
          id="wd-add-assignment-group"
          className="text-nowrap btn btn-danger mt-2 ms-2"
          onClick={()=>{updateQuestion()}}        >
          Update Question
        </button>
      </div>
    </div>
  );
}
