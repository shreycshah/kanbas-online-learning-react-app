import { useState } from "react";
import { FaCalendarAlt, FaChevronDown, FaTimes } from "react-icons/fa";

export default function DetailsEditor(){
    const [selectedAssignTo, setSelectedAssignTo] = useState('Everyone');

    return (
        <div id="wd-quiz-details-editor" className="container mt-4">
            {/* Assignment Name */}
            <div className="row mb-2"> {/* Reduced margin */}
                <div className="col">
                    <label htmlFor="wd-name" className="form-label">Quiz Name</label>
                    <input id="wd-name" value="Unnamed Quiz" className="form-control" />
                </div>
            </div>

            {/* Quiz Instructions */}
            <div className="row mb-3">
                <div className="col-md-12">
                    <label htmlFor="wd-instructions" className="form-label">Quiz Instructions</label>
                    <textarea
                        cols={40}
                        rows={5}
                        id="wd-description"
                        className="form-control"
                        defaultValue={`This is a quiz description. You can provide instructions for the quiz here.`}
                    />
                </div>
            </div>

            <div className="row mb-2">
                {/* Quiz Type */}
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <label htmlFor="wd-group" className="form-label">Quiz Type</label>
                </div>
                <div className="col-md-9">
                    <div className="input-group">
                        <select id="wd-group" className="form-control">
                            <option value="QUIZZES">Graded Quiz</option>
                            <option value="ASSIGNMENTS">Practice Quiz</option>
                            <option value="PROJECT">Graded Survey</option>
                            <option value="EXAM">Ungraded Survey</option>
                        </select>
                        <span className="input-group-text">
                            <FaChevronDown /> {/* React Icon for dropdown arrow */}
                        </span>
                    </div>
                </div>
            </div>

            <div className="row mb-2">
                {/* Assignment Group */}
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                </div>
                <div className="col-md-9">
                    <div className="input-group">
                        <select id="wd-group" className="form-control">
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="PROJECT">PROJECT</option>
                            <option value="EXAM">EXAM</option>
                        </select>
                        <span className="input-group-text">
                            <FaChevronDown /> {/* React Icon for dropdown arrow */}
                        </span>
                    </div>
                </div>
            </div>


            {/* Options Section */}
            <div className="row mb-3">
                <div className="col-md-3 d-flex align-items-center justify-content-end">
                    <label htmlFor="wd-options" className="form-label">Options</label>
                </div>
                <div className="col-md-9">
                    <div className="border p-3"> {/* Added border and padding */}
                        {/* Shuffle Answers */}
                        <div className="form-check">
                            <input type="checkbox" id="shuffle-answers" className="form-check-input" defaultChecked />
                            <label htmlFor="shuffle-answers" className="form-check-label">Shuffle Answers</label>
                        </div>

                        {/* Time Limit */}
                        <div className="form-check d-flex align-items-center">
                            <input type="checkbox" id="time-limit" className="form-check-input me-2" defaultChecked />
                            <label htmlFor="time-limit" className="form-check-label me-3">Time Limit</label>
                            <input
                                type="number"
                                id="time-limit-minutes"
                                className="form-control"
                                placeholder="Enter time in minutes"
                                style={{ maxWidth: '100px' }}
                                defaultValue="20"
                            />
                        </div>

                        {/* Allow Multiple Attempts */}
                        <div className="form-check d-flex align-items-center mt-3">
                            <input type="checkbox" id="multiple-attempts" className="form-check-input me-2" />
                            <label htmlFor="multiple-attempts" className="form-check-label me-3">Allow Multiple Attempts</label>
                            <label htmlFor="number-of-attempts" className="form-check-label me-2">Number of Attempts</label>
                            <input
                                type="number"
                                id="number-of-attempts"
                                className="form-control"
                                placeholder="Number of attempts"
                                style={{ maxWidth: '80px' }}
                                value="1"
                            />
                        </div>

                        {/* One Question at a Time */}
                        <div className="form-check">
                            <input type="checkbox" id="one-question-at-a-time" className="form-check-input" defaultChecked />
                            <label htmlFor="one-question-at-a-time" className="form-check-label">One Question at a Time</label>
                        </div>

                        {/* Webcam Required */}
                        <div className="form-check">
                            <input type="checkbox" id="webcam-required" className="form-check-input" />
                            <label htmlFor="webcam-required" className="form-check-label">Webcam Required</label>
                        </div>

                        {/* Lock Question after Answering */}
                        <div className="form-check">
                            <input type="checkbox" id="lock-question" className="form-check-input" />
                            <label htmlFor="lock-question" className="form-check-label">Lock Question after Answering</label>
                        </div>

                        {/* Access Code */}
                        <div className="form-group mt-3">
                            <label htmlFor="access-code" className="form-label">Access Code</label>
                            <input
                                type="text"
                                id="access-code"
                                className="form-control"
                                placeholder="Enter access code"
                                style={{ maxWidth: '300px' }}
                                defaultValue=""
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* Assign To, Due Date, and Availability */}
            <div className="row mb-3">
                <div className="col-md-3 d-flex justify-content-end">
                    <label className="form-label">Assign</label>
                </div>
                <div className="col-md-9">
                    <div className="border p-3">
                        {/* Assign To */}
                        <div className="mb-3">
                            <label htmlFor="wd-assign-to" className="form-label font-weight-bold">Assign to</label>
                            <div className="input-group">
                                <input id="wd-assign-to" value={selectedAssignTo} className="form-control" />
                                <span className="input-group-text">
                                    <FaTimes /> {/* Cross icon */}
                                </span>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="form-label font-weight-bold">Due</label>
                            <div className="input-group">
                                <input
                                    id="wd-due-date"
                                    type="datetime-local"
                                    className="form-control"
                                    defaultValue="2024-05-13T23:59" // Default Due Date
                                />
                                <span className="input-group-text">
                                    <FaCalendarAlt /> {/* Calendar icon */}
                                </span>
                            </div>
                        </div>

                        {/* Available From and Until */}
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="wd-available-from" className="form-label font-weight-bold">Available from</label>
                                <div className="input-group">
                                    <input
                                        id="wd-available-from"
                                        type="datetime-local"
                                        className="form-control"
                                        defaultValue="2024-05-06T12:00" // Default Available From Date
                                    />
                                    <span className="input-group-text">
                                        <FaCalendarAlt /> {/* Calendar icon */}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="wd-available-until" className="form-label font-weight-bold">Until</label>
                                <div className="input-group">
                                    <input
                                        id="wd-available-until"
                                        type="datetime-local"
                                        className="form-control"
                                        defaultValue="2024-05-20T23:59" // Default Until Date
                                    />
                                    <span className="input-group-text">
                                        <FaCalendarAlt /> {/* Calendar icon */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}