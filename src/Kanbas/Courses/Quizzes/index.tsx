import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import QuizControlRightButtons from "./QuizControlRightButtons";
import { LuFileEdit } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import { setQuizzes, deleteQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Quizzes() {
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);  // Use 'quizzes' not 'quizes'
    console.log("Quizzes:", quizzes);
    const dispatch = useDispatch();

    const fetchQuizes = () => {
        dispatch(setQuizzes(quizzes));  // It looks like you're setting quizzes again here, make sure it's required
    };

    useEffect(() => {
        fetchQuizes();
    }, [dispatch]);

    // Updated deleteQuiz handler to dispatch correctly
    const removeQuiz = (quizId: string) => {
        dispatch(deleteQuiz(quizId));  // Make sure to dispatch the action correctly
    };

    return (
        <div>
            <div className="container mt-4 mb-4">
                <div className="row">
                    <div className="col-md-6 float-start">
                        <div className="input-group">
                            <span className="input-group-text">
                                <CiSearch />
                            </span>
                            <input type="text" className="form-control" placeholder="Search..." />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <QuizControls />
                    </div>
                </div>
            </div>

            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <b>Quizzes</b>
                        <QuizControlButtons />
                        <span className="border border-dark rounded-5 p-1 me-2 float-end">40% of Total</span>
                    </div>

                    <ul className="wd-lessons list-group rounded-0">
                        {quizzes.map((quiz: any) => (
                            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between" key={quiz._id}>
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <LuFileEdit className="me-2 fs-3" />
                                    <div>
                                        <Link to={`Info/${quiz._id}`} className="no-underline">
                                            {quiz.title}
                                        </Link>
                                        <br />
                                        <span className="text">{quiz.Status}</span> |
                                        <b>Not Available until </b> {quiz.dates.available.slice(0,16).split("T")[0]} at {quiz.dates.available.slice(0,16).split("T")[1]} | <br />
                                        <b>Due</b> {quiz.dates.due.slice(0,16).split("T")[0]} at  {quiz.dates.due.slice(0,16).split("T")[1]} | {quiz.points} pts | {quiz.totQuestions} Questions
                                    </div>
                                </div>
                                <div className="float-end">
                                    <QuizControlRightButtons quizId={quiz._id}
                                        deleteQuiz={(quizId) => { removeQuiz(quizId) }}
                                        isPublished = {quiz.isPublished} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
