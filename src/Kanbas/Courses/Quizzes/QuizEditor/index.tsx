import { useState, useEffect } from "react";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addQuiz, updateQuiz } from '../reducer';
// import CancelSaveButtons from "./cancelSaveButtons";

export default function QuizzesEditor() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const quiz = quizzes.find((q: any) => q._id === qid);
  console.log("Quiz Found: ", quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("details");

  const [details, setDetails] = useState({
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
  });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quiz) {
      console.log("Setting details in setDetails: ", quiz);
      setDetails({
        "title": quiz.title,
        "course": cid,
        "description": quiz.description,
        "quizType": quiz.quizType,
        "assignmentGroup": quiz.assignmentGroup,
        "settings": {
          "shuffleAnswers": quiz.settings.shuffleAnswers,
          "timeLimit":  quiz.settings.timeLimit,
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
          "webcamRequired":   quiz.settings.webcamRequired,
          "lockQuestionsAfterAnswering": quiz.settings.lockQuestionsAfterAnswering,
        },
        "dates": {
          "available": quiz.dates.available,
          "due": quiz.dates.due,
          "until": quiz.dates.until,
        },
        "isPublished": quiz.isPublished,
      });
      console.log("Details set in setDetails: ", details);
    }
  }, [quiz]);

  const handleSave = () => {
    console.log("Saving Quiz: ", details);
    const quizExists = quizzes && quizzes.find((q: any) => q._id === qid);
    if(!quizExists){
      const newQuiz = {
        _id: qid,
        ...details,
        questions,
      };
      if (cid) {
        dispatch(addQuiz(newQuiz));
        console.log("Created new quiz: ", newQuiz._id);
      }
    } else{
      const updatedQuiz = {
        ...quizExists,
        ...details,
        questions,
      };
      dispatch(updateQuiz(updatedQuiz));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div>
      <h1>Quizzes</h1>
      <br />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${tab == "details" ? "text-dark active" : " text-danger"
              }`}
            onClick={() => setTab("details")}
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab == "questions" ? "text-dark active" : " text-danger"}`}
            onClick={() => setTab("questions")}
          >
            Questions
          </a>
        </li>
      </ul>
      {tab == "details" ?
        <DetailsEditor details={details} setDetails={setDetails} /> :
        <QuestionsEditor />}
      <hr className="mt-3" />
      <div className="d-flex justify-content-center align-items-center mt-2">
        {/* <CancelSaveButtons/> */}
        <div className="d-flex">
          <button
            id="wd-add-assignment-group"
            className="text-nowrap btn btn-lg btn-secondary m-3">
            Cancel
          </button>
          <button
            id="wd-add-assignment-group"
            className="text-nowrap btn btn-lg btn-danger m-3"
            onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
