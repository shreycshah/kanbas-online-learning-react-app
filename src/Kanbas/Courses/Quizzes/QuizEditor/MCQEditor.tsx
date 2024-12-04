import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MCQEditor({
  questionText,
  setQuestionText,
  choices,
  setChoices,
  reset
}: {
  questionText: string;
  setQuestionText: any;
  choices: any;
  setChoices: any;
  reset:any;
}) {
  console.log("newquestion text:",questionText)
  const [possibleAnswers, setPossibleAnswers] = useState<any[]>(choices);
  const [correctAnswer, setcorrectAnswer] = useState(-1);
  const [localQuestion, setLocalQuestion] = useState(questionText);
  const addAnswer = () => {
    const payload = { answer: "", isCorrect: false }
    if(possibleAnswers.length < 1){
      payload.isCorrect = true
      setcorrectAnswer(0)
    };
    
    setPossibleAnswers([...possibleAnswers, payload]);
  };

  const [isHovered, setIsHovered] = useState<number>(-1);
  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
  };
  const toggleAnswerCorrectness = (index: number) => {
    let currentCorrect = -1;
    currentCorrect = possibleAnswers.findIndex(
      (element) => element.isCorrect === true
    );
    const newPossibleAnswers = possibleAnswers;
    if (currentCorrect != -1) {
      newPossibleAnswers[currentCorrect] = {
        ...newPossibleAnswers[currentCorrect],
        isCorrect: false,
      };
    }
    newPossibleAnswers[index] = {
      ...newPossibleAnswers[index],
      isCorrect: true,
    };
    setPossibleAnswers([...newPossibleAnswers])
    setcorrectAnswer(index);
  };
  const deleteAnswer = (ind: number) => {
    if(possibleAnswers.length>1){
      const newAnswers = possibleAnswers.filter((answer, index) => index != ind);
      if(newAnswers.length == 1){
        newAnswers[0].isCorrect  = true;
        setcorrectAnswer(0)
      }
      setPossibleAnswers([...newAnswers]);
    }
  };
  const updateAnswer = (index: number, answer: string) => {
    const newAnswers = possibleAnswers;
    newAnswers[index].answer = answer;
    setPossibleAnswers([...newAnswers]);
  };

  useEffect(() => {
    setQuestionText(localQuestion);
    setChoices([...possibleAnswers]);
  }, [localQuestion, possibleAnswers]);

  useEffect(()=>{
    console.log("Inside MCQ Editor:",questionText,choices )
    console.log("localquestion:",localQuestion)
    setLocalQuestion(questionText)
    let currentCorrect = choices.findIndex(
      (element:any) => element.isCorrect === true
    );
    setPossibleAnswers(choices)
    setcorrectAnswer(currentCorrect)

  },[reset])


//   useEffect(()=>{
//     setPossibleAnswers([...choices])   
//     setLocalQuestion(questionText) 
// },[questionText, choices])

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
        value={localQuestion}
        onChange={(e) => setLocalQuestion(e.target.value)}
      >
        {" "}
      </textarea>
      <br />
      <h5>Answers:</h5>
      <div>
        {possibleAnswers.map((answer, index) => (
          <div
            className={
              isHovered == index
                ? "d-flex align-items-center mt-3 border border-secondary rounded-1 pt-3 pb-3"
                : "d-flex align-items-center mt-3"
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {isHovered == index ? (
              answer.isCorrect ? (
                <FaCheck
                  className="text-success ms-2"
                  onClick={() => {
                    toggleAnswerCorrectness(index);
                  }}
                />
              ) : (
                <FaCheck
                  className="text-secondary ms-2"
                  onClick={() => {
                    toggleAnswerCorrectness(index);
                  }}
                />
              )
            ) : (
              correctAnswer == index && (
                <FaCheck className="text-success ms-2" />
              )
            )}
            <label
              htmlFor="wd-question-pts"
              className={
                correctAnswer == index || isHovered == index
                  ? "form-label ms-4 me-2"
                  : "form-label ms-5 me-2"
              }
            >
              Possible Answer{" "}
            </label>
            <input
              id="wd-question-pts"
              className="form-control"
              value={answer.answer}
              style={{ width: "50%" }}
              onChange={(e) => {
                isHovered == index && updateAnswer(index, e.target.value);
              }}
            ></input>
            {isHovered == index && <LuPencil className="ms-auto me-1" />}
            {isHovered == index && (
              <MdOutlineDeleteOutline
                className="ms-1 me-3"
                onClick={() => deleteAnswer(index)}
              />
            )}
          </div>
        ))}

        <br />
        <div className="d-flex justify-content-end align-items-center pt-3 pb-3">
          <button
            className=" btn btn-link p-0 m-0 text-decoration-none text-danger"
            onClick={() => addAnswer()}
          >
            {" "}
            + Add another answer
          </button>
        </div>
      </div>
    </div>
  );
}
