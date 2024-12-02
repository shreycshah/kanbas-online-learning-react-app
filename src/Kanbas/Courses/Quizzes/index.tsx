import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import QuizControlRightButtons from "./QuizControlRightButtons";
import { Link } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import { BsGripVertical } from "react-icons/bs";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
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

    const changePublishStatus = (quizId: string) => {
        const quiz = quizzes.find((q: any) => q._id === quizId);
        const currentStatus = quiz.isPublished;
        const newQuiz = { ...quiz, isPublished: !currentStatus };
        dispatch(updateQuiz(newQuiz));
    };

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    function quizStatus(dates: any): string {
        const availableDate = new Date(dates.available);
        const untilDate = new Date(dates.until);
        const currentDate = new Date();
        if (currentDate < availableDate) {
            return "Not Available Until " + dates.available.slice(0, 16).split("T")[0];
        } else if (currentDate > availableDate && currentDate < untilDate) {
            return "Available";
        } else {
            return "Closed";
        }
    }

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
                            isPublished={quiz.isPublished}
                            negatePublishStatus={(quizId) => { changePublishStatus(quizId) }} />

                    </li>
                ))}
            </ul>
        </div>
    );
}
