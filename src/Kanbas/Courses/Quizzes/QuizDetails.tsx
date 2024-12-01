import { FaPencilAlt } from 'react-icons/fa'

export default function QuizDetails() {
    return (
        <div className="container mt-4">
            {/* Buttons */}
            <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-secondary me-2">Preview</button>
                <button className="btn btn-secondary me-2">
                    <FaPencilAlt className="me-2" /> Edit {/* Pencil icon with label */}
                </button>
            </div>
            <hr />

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Q1 - HTML</h3>
            </div>

            {/* Details Section */}
            <div className="row mb-4">
                <div className="col-md-8"> {/* Constrain width and align left */}
                    <table className="table table-borderless table-sm"> {/* Reduced spacing */}
                        <tbody>
                            <tr>
                                <th scope="row" className="text-end pe-3">Quiz Type</th>
                                <td className="text-start">Graded Quiz</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Points</th>
                                <td className="text-start">29</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Assignment Group</th>
                                <td className="text-start">QUIZZES</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Shuffle Answers</th>
                                <td className="text-start">No</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Time Limit</th>
                                <td className="text-start">30 Minutes</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Multiple Attempts</th>
                                <td className="text-start">No</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">View Responses</th>
                                <td className="text-start">Always</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Show Correct Answers</th>
                                <td className="text-start">Immediately</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">One Question at a Time</th>
                                <td className="text-start">Yes</td>
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
                                <td className="text-start">No</td>
                            </tr>
                            <tr>
                                <th scope="row" className="text-end pe-3">Lock Questions After Answering</th>
                                <td className="text-start">No</td>
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
                                <td className="text-center align-middle">Sep 21 at 1pm</td>
                                <td className="text-center align-middle">Everyone</td>
                                <td className="text-center align-middle">Sep 21 at 11:40am</td>
                                <td className="text-center align-middle">Sep 21 at 1pm</td>
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

        </div>
    );
}