import { useState } from "react";
import { useLocation } from "react-router";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";
// import CancelSaveButtons from "./cancelSaveButtons";

export default function QuizzesEditor() {
  const [tab, setTab] = useState("details");
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
            className={`nav-link ${tab == "questions" ? "text-dark active" : " text-danger"
              }`}
            onClick={() => setTab("questions")}
          >
            Questions
          </a>
        </li>
      </ul>
      {tab == "details" ? <DetailsEditor /> : <QuestionsEditor />}
      <hr className="mt-3" />
      <div className="d-flex justify-content-center align-items-center mt-2">
        {/* <CancelSaveButtons/> */}
        <div className="d-flex">
          <button
            id="wd-add-assignment-group"
            className="text-nowrap btn btn-lg btn-secondary m-3"
          >
            Cancel
          </button>
          <button
            id="wd-add-assignment-group"
            className="text-nowrap btn btn-lg btn-danger m-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
