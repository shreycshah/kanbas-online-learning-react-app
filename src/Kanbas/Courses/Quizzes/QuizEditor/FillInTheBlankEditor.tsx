import { MdOutlineDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { useEffect, useState } from "react";

export default function FillInTheBlankEditor({
  questionText,
  setQuestionText,
  possibleAnswers,
  setPossibleAnswers,
  reset,
}: {
  questionText: string;
  setQuestionText: any;
  possibleAnswers: any[];
  setPossibleAnswers: any;
  reset:any;
}) {

  const [localPossibleAnswers, setLocalPossibleAnswers] = useState<any[]>([
    ...possibleAnswers,
  ]);
  // const [correctAnswer, setcorrectAnswer] = useState(-1);
  const [localQuestion, setLocalQuestion] = useState(questionText);
  const addAnswer = () => {
    // setLocalPossibleAnswers([
    //   ...localPossibleAnswers,
    //   { answer: "", isCorrect: false },
    // ]);
    setLocalPossibleAnswers([
      ...localPossibleAnswers,
      "",
    ]);
  };
  const [isHovered, setIsHovered] = useState<number>(-1);
  const handleMouseEnter = (index: number) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(-1);
  };
  // const toggleAnswerCorrectness = (index: number) => {
  //   setcorrectAnswer(index);
  // };
  const deleteAnswer = (ind: number) => {
    if(localPossibleAnswers.length>1){
      const newAnswers = localPossibleAnswers.filter(
        (answer, index) => index != ind
      );
      setLocalPossibleAnswers([...newAnswers]);
    }
    
  };
  const updateAnswer = (index: number, answer: string) => {
    const newAnswers = localPossibleAnswers;
    newAnswers[index] = answer;
    setLocalPossibleAnswers([...newAnswers]);
  };

  useEffect(() => {
    setQuestionText(localQuestion);
    setPossibleAnswers([...localPossibleAnswers]);
  }, [localQuestion, localPossibleAnswers]);

  useEffect(()=>{
    // console.log("PossibleAns",poss)
    setLocalQuestion(questionText)
    setLocalPossibleAnswers(possibleAnswers)
  },[reset])
  return (
    <div>
      <p>
        Enter your question text, then define all the possible correct answers
        for the blank.
      </p>
      <h5>Question:</h5>
      <textarea
        id="wd-description"
        className=" form-control border border-dark rounded-1  mt-2"
        rows={4}
        value={localQuestion}
        onChange={(e) => {
          setLocalQuestion(e.target.value);
        }}
      >
        {" "}
      </textarea>
      <br />
      <h5>Answers:</h5>
      <div>
        {localPossibleAnswers.map((answer, index) => (
          <div
            className={
              isHovered == index
                ? "d-flex align-items-center mt-3 border border-secondary rounded-1 pt-3 pb-3"
                : "d-flex align-items-center mt-3"
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <label
              htmlFor="wd-question-pts"
              className={"form-label ms-5 me-2"
              }
            >Possible Answer</label>
            <input
              id="wd-question-pts"
              className="form-control"
              value={answer}
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
