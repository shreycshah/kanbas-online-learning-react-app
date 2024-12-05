import { PiArrowFatRight } from "react-icons/pi";
import TrueFalse from "./TrueAndFalsePreview";
import MCQ from "./McqPreview";
import FillInTheBlanks from "./FillinTheBlanksPreview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function QuizPreview() {
    const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const [details, setDetails] = useState(
    {
    "title": "Untitled Quiz",
    "course": cid,
    "description": "",
    "quizType": "Graded Quiz",
    "assignmentGroup": "QUIZZES",
    "settings": {
      "shuffleAnswers": true,
      "timeLimit": 20,
      "multipleAttempts": {
        "enabled": false,
        "attemptsAllowed": 1,
      },
      "showCorrectAnswers": {
        "enabled": true,
        "timing": "",
      },
      "accessCode": "",
      "oneQuestionAtATime": true,
      "webcamRequired": false,
      "lockQuestionsAfterAnswering": false,
    },
    "dates": {
      "available": new Date().toISOString(),
      "due": new Date().toISOString(),
      "until": new Date().toISOString(),
    },
    "isPublished": false,
  }
);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (quiz) {
       setDetails({...details,
        "title": quiz.title,
        "course": cid,
        "description": quiz.description,
        "quizType": quiz.quizType,
        "assignmentGroup": quiz.assignmentGroup,
        "settings": {
          "shuffleAnswers": quiz.settings.shuffleAnswers,
          "timeLimit": quiz.settings.timeLimit,
          "multipleAttempts": {
            "enabled": quiz.settings.multipleAttempts.enabled,
            "attemptsAllowed": quiz.settings.multipleAttempts.attemptsAllowed,
          },
          "showCorrectAnswers": {
            "enabled": quiz.settings.showCorrectAnswers.enabled,
            "timing": quiz.settings.showCorrectAnswers.timing,
          },
          "accessCode": quiz.settings.accessCode,
          "oneQuestionAtATime": quiz.settings.oneQuestionAtATime,
          "webcamRequired": quiz.settings.webcamRequired,
          "lockQuestionsAfterAnswering": quiz.settings.lockQuestionsAfterAnswering,
        },
        "dates": {
          "available": quiz.dates.available,
          "due": quiz.dates.due,
          "until": quiz.dates.until,
        },
        "isPublished": quiz.isPublished,
      });
      //set answer as empty to record use answer
      setQuestions([...quiz.questions.map((question:any)=>({...question,answer:""}))]);
    }
  }, [quiz]);
  const [active, setActive] = useState<number>(0);
  const goNext = () => {
    setActive(active + 1);
  };
  const goPrev = () => {
    setActive(active - 1);
  };

  const updateQuestions = (newQuestion:any, index:number)=>{
    const newQuestions = questions
    newQuestions[index] = {...newQuestions[index], ...newQuestion}
    setQuestions([...newQuestions])
  }

  return (
    <div>
      <h3>Question Title</h3>
      <hr />

      <div className="row">
        <div className="col-1 d-flex justify-content-end">
          <PiArrowFatRight size={40} />
        </div>
        <div className="col-9">
          <div>
            {questions.map((question, index) => {
              if (active == index) {
                switch (question.type) {
                  case "mcq":
                    return (
                      <div key={index}>
                        <MCQ question={question} updateQuestions={updateQuestions} index={index}/>
                      </div>
                    );
                  case "tf":
                    return (
                      <div key={index}>
                        <TrueFalse question={question}  updateQuestions={updateQuestions} index={index}/>
                      </div>
                    );
                  case "fib":
                    return (
                      <div key={index}>
                        <FillInTheBlanks  question={question} updateQuestions={updateQuestions} index={index}/>
                      </div>
                    );
                  default:
                    return null;
                }
              }
            })}
          </div>

          <br />
          <div className="d-flex justify-content-between align-items-center">
            {active > 0 && (
              <button
                className="btn btn-lg btn-danger border border-dark rounded-1"
                onClick={() => {
                  goPrev();
                }}
              >
                Previous
              </button>
            )}
            {active < questions.length - 1 && (
              <button
                className="btn btn-lg btn-secondary border border-dark rounded-1 ms-auto"
                onClick={() => {
                  goNext();
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className = "col-2"></div>
        <div className="d-flex mt-4 p-3 border border-dark rounded-1 align-items-center justify-content-end m-3">
          <span className=" me-3">Quiz saved at 8:12</span>
          <button
            className={`btn btn-lg border border-dark rounded-1 float-right ${
              active >= questions.length - 1 ? `btn-danger` : `btn-secondary`
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
