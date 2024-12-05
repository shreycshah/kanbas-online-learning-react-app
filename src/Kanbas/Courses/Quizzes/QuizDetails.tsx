import { FaPencilAlt } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((q: any) => q._id === qid);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    function calculateTotalPoints(questions: any[]): number {
        return questions.reduce((total, question) => {
            const points = Number(question.points);
            if (isNaN(points)) {
                throw new Error(`Invalid points value in question: ${question.title}`);
            }
            return total + points;
        }, 0);
    }
    return (
        <div className="container mt-4">
            {/* Buttons */}
            {currentUser && currentUser?.role == "FACULTY" && (
                <>
                    <div className="d-flex justify-content-center mb-3">
                        <button className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/Attempt/${quiz._id}`)}>Preview</button>
                        <button className="btn btn-secondary me-2" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/Edit/${quiz._id}`)}>
                            <FaPencilAlt className="me-2" /> Edit {/* Pencil icon with label */}
                        </button>
                    </div>
                    <hr />
                </>
            )}

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>{quiz.title}</h3>
            </div>

            {/* Details Section */}
            <div className="row mb-4">
                <div className="col-md-8"> {/* Constrain width and align left */}
                    <table className="table table-borderless table-sm"> {/* Reduced spacing */}
                        <tbody>
                            <tr>
                                <th scope="row" className="text-end pe-3">Quiz Type</th>
                                <td className="text-start">{quiz.quizType}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Points</th>
                                <td className="text-start">{calculateTotalPoints(quiz.questions)}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Assignment Group</th>
                                <td className="text-start">{quiz.assignmentGroup}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Shuffle Answers</th>
                                <td className="text-start">{quiz.settings.shuffleAnswers ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Time Limit</th>
                                <td className="text-start">{quiz.settings.timeLimit} Minutes</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Multiple Attempts</th>
                                <td className="text-start">{quiz.settings.multipleAttempts.enabled ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">View Responses</th>
                                <td className="text-start">Yes</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Show Correct Answers</th>
                                <td className="text-start">{quiz.settings.showCorrectAnswers.enabled ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">One Question at a Time</th>
                                <td className="text-start">{quiz.settings.oneQuestionAtATime ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Require Respondus LockDown Browser</th>
                                <td className="text-start">No</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Required to View Quiz Results</th>
                                <td className="text-start">No</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Webcam Required</th>
                                <td className="text-start">{quiz.settings.webcamRequired ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Lock Questions After Answering</th>
                                <td className="text-start">{quiz.settings.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Availability Section */}
            <div className="row">
                <div className="col-md-8 mx-auto"> {/* Center align the table */}
                    <table className="table table-borderless table-sm"> {/* Reduced spacing */}
                        <thead className="border-bottom"> {/* Add bottom border */}
                            <tr>
                                <th className="text-center align-middle">Due</th>
                                <th className="text-center align-middle">For</th>
                                <th className="text-center align-middle">Available from</th>
                                <th className="text-center align-middle">Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center align-middle">{quiz.dates.due.slice(0, 16).split("T")[0]} at {quiz.dates.due.slice(0, 16).split("T")[1]}</td>
                                <td className="text-center align-middle">Everyone</td>
                                <td className="text-center align-middle">{quiz.dates.available.slice(0, 16).split("T")[0]} at {quiz.dates.available.slice(0, 16).split("T")[1]}</td>
                                <td className="text-center align-middle">{quiz.dates.until.slice(0, 16).split("T")[0]} at {quiz.dates.until.slice(0, 16).split("T")[1]}</td>
                            </tr>
                        </tbody>
                        <tfoot className="border-top"> {/* Add top border */}
                            <tr>
                                <td ></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {currentUser && currentUser?.role == "STUDENT" && (
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-danger"
                        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/Attempt/${quiz._id}`)}>
                        Attempt Quiz
                    </button>
                </div>
            )}

        </div >
    );
}