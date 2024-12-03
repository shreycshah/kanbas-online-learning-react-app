import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import QuizControlRightButtons from "./QuizControlRightButtons";
import { Link } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import { BsGripVertical } from "react-icons/bs";
import { setQuizzes, deleteQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import AssignmentControlButtons from "../Assignments/AssignmentControlButtons";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoRocketOutline } from "react-icons/io5";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer); 
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

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    function quizStatus(dates: any): string {
        const availableDate = new Date(dates.available);
        const untilDate = new Date(dates.until);
        const currentDate = new Date();
        if (currentDate < availableDate) {
            return "Not Available Until " + dates.available.slice(0,16).split("T")[0];
        } else if (currentDate > availableDate && currentDate < untilDate) {
            return "Available";
        } else {
            return "Closed";
        }
    }

    // return (
    // <div>
    //     <div className="container mt-4 mb-4">
    //         <div className="row">
    //             <div className="col-md-6 float-start">
    //                 <div className="input-group">
    //                     <span className="input-group-text">
    //                         <CiSearch />
    //                     </span>
    //                     <input type="text" className="form-control" placeholder="Search..." />
    //                 </div>
    //             </div>
    //             <div className="col-md-6 d-flex justify-content-end">
    //                 <QuizControls />
    //             </div>
    //         </div>
    //     </div>

    //     <ul id="wd-modules" className="list-group rounded-0">
    //         <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
    //             <div className="wd-title p-3 ps-2 bg-secondary">
    //                 <BsGripVertical className="me-2 fs-3" />
    //                 <b>Quizzes</b>
    //                 <QuizControlButtons />
    //                 <span className="border border-dark rounded-5 p-1 me-2 float-end">40% of Total</span>
    //             </div>

    //             <ul className="wd-lessons list-group rounded-0">
    //                 {quizzes.map((quiz: any) => (
    //                     <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between" key={quiz._id}>
    //                         <div className="d-flex align-items-center">
    //                             <BsGripVertical className="me-2 fs-3" />
    //                             <LuFileEdit className="me-2 fs-3" />
    //                             <div>
    //                                 <Link to={`Info/${quiz._id}`} className="no-underline">
    //                                     {quiz.title}
    //                                 </Link>
    //                                 <br />
    //                                 <span className="text">{quiz.Status}</span> |
    //                                 <b>Not Available until </b> {quiz.dates.available.slice(0,16).split("T")[0]} at {quiz.dates.available.slice(0,16).split("T")[1]} | <br />
    //                                 <b>Due</b> {quiz.dates.due.slice(0,16).split("T")[0]} at  {quiz.dates.due.slice(0,16).split("T")[1]} | {quiz.points} pts | {quiz.totQuestions} Questions
    //                             </div>
    //                         </div>
    //                         <div className="float-end">
    //                             <QuizControlRightButtons quizId={quiz._id}
    //                                 deleteQuiz={(quizId) => { removeQuiz(quizId) }}
    //                                 isPublished = {quiz.isPublished} />
    //                         </div>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </li>
    //     </ul>
    // </div>
    // );
    return (
        <div>
            <QuizControls />
            <div className="wd-quizzes-title p-3 ps-2 bg-secondary" style={{ color: 'black', border: '1px solid black' }}>
                <BsGripVertical className="me-2 fs-3" /> <GoTriangleDown />
                <strong>QUIZZES</strong><AssignmentControlButtons /></div>
            <ul className="wd-quizzes-list list-group rounded-0">
                {quizzes.map((quiz: any) => (
                    <li key={quiz._id} className="wd-quiz-list-item list-group-item d-flex align-items-center" style={{ border: '1px solid black', color: 'black' }}>
                        <BsGripVertical className="text-muted me-2 fs-5" />
                        <IoRocketOutline style={{ marginRight: 10, color: 'green' }} />
                        <div className="flex-grow-1">
                            {currentUser && currentUser?.role == "FACULTY" && (
                                <>
                                    <a href={`#/Kanbas/Courses/${cid}/Quizzes/Info/${quiz._id}`} style={{ color: 'black' }}>
                                        <strong>{quiz.title}</strong>
                                    </a>
                                </>
                            )}
                            {currentUser && currentUser?.role != "FACULTY" && (
                                <>
                                    <strong>{quiz.title}</strong>
                                </>
                            )}
                            <div className="small">
                                <strong>{quizStatus(quiz.dates)}</strong> | <strong>Due </strong> {quiz.dates.due.slice(0, 16).split("T")[0]} at {quiz.dates.due.slice(0, 16).split("T")[1]} | 100 pts | {quiz.questions.length} Questions
                            </div>
                        </div>
                        <QuizControlRightButtons quizId={quiz._id}
                            deleteQuiz={(quizId) => { removeQuiz(quizId) }}
                            isPublished={quiz.isPublished} />

                    </li>
                ))}
            </ul>
        </div>
    );
}
