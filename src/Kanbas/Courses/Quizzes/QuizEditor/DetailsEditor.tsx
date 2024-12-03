import { useState, useEffect } from "react";
import { FaCalendarAlt, FaChevronDown, FaTimes } from "react-icons/fa";

export default function DetailsEditor({ details, setDetails, reset }: { details: any, setDetails: any, reset:boolean }) {
    const [selectedAssignTo, setSelectedAssignTo] = useState('Everyone');
    console.log("updated details: ", details);

    const [localDetails, setLocalDetails] = useState({...details});
    useEffect(() => {
        setDetails(localDetails); // Update parent state whenever localDetails changes
    }, [localDetails]);
    
    useEffect(()=>{
        setLocalDetails({...details});
    },[reset]);
  
    return (
        <div id="wd-quiz-details-editor" className="container mt-4">
            {/* Quiz Name */}
            <div className="row mb-2">
                <div className="col">
                    <label htmlFor="wd-name" className="form-label">Quiz Name</label>
                    <input id="wd-name" value={localDetails.title || "Unnamed Quiz"} className="form-control"
                        onChange={(e) => { setLocalDetails((prev: any) => ({ ...prev, title: e.target.value })) }} />
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
                        value={localDetails.description || ""}
                        onChange={(e) => { setLocalDetails((prev: any) => ({ ...prev, description: e.target.value })) }}
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
                        <select id="wd-group" className="form-control"
                            value={localDetails.quizType || "Graded Quiz"}
                            onChange={(e) => {
                                setLocalDetails((prev: any) => ({ ...prev, quizType: e.target.value }));
                            }}>
                            <option value="Graded Quiz">Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
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
                        <select id="wd-group" className="form-control"
                            value={localDetails.assignmentGroup || "QUIZZES"}
                            onChange={(e) => {
                                setLocalDetails((prev: any) => ({ ...prev, quizType: e.target.value }));
                            }}>
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
                    <div className="border p-3">
                        {/* Shuffle Answers */}
                        <div className="form-check">
                            <input type="checkbox" id="shuffle-answers" className="form-check-input"
                                checked={localDetails.settings?.shuffleAnswers || false}
                                onChange={(e) => {
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            shuffleAnswers: e.target.checked,
                                        },
                                    }));
                                }} />
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
                                value={localDetails.settings?.timeLimit || 20}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10) || 0;
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            timeLimit: value,
                                        },
                                    }));
                                }}
                            />
                        </div>

                        {/* Allow Multiple Attempts */}
                        <div className="form-check d-flex align-items-center mt-3">
                            <input type="checkbox" id="multiple-attempts" className="form-check-input me-2"
                                checked={localDetails.settings?.multipleAttempts?.enabled || false}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            multipleAttempts: {
                                                ...prev.settings?.multipleAttempts,
                                                enabled: isChecked,
                                            },
                                        },
                                    }));
                                }} />
                            <label htmlFor="multiple-attempts" className="form-check-label me-3">Allow Multiple Attempts</label>
                            <label htmlFor="number-of-attempts" className="form-check-label me-2">Number of Attempts</label>
                            <input
                                type="number"
                                id="number-of-attempts"
                                className="form-control"
                                placeholder="Number of attempts"
                                style={{ maxWidth: '80px' }}
                                value={localDetails.settings?.multipleAttempts?.attemptsAllowed || 1}
                                onChange={(e) => {
                                    const attempts = parseInt(e.target.value, 10) || 0;
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            multipleAttempts: {
                                                ...prev.settings?.multipleAttempts,
                                                attemptsAllowed: attempts,
                                            },
                                        },
                                    }));
                                }}
                                disabled={!localDetails.settings?.multipleAttempts?.enabled}
                            />
                        </div>

                        {/* One Question at a Time */}
                        <div className="form-check">
                            <input type="checkbox" id="one-question-at-a-time" className="form-check-input"
                                checked={localDetails.settings?.oneQuestionAtATime || false}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            oneQuestionAtATime: isChecked,
                                        },
                                    }));
                                }} />
                            <label htmlFor="one-question-at-a-time" className="form-check-label">One Question at a Time</label>
                        </div>

                        {/* Webcam Required */}
                        <div className="form-check">
                            <input type="checkbox" id="webcam-required" className="form-check-input"
                                checked={localDetails.settings?.webcamRequired || false}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            webcamRequired: isChecked,
                                        },
                                    }));
                                }} />
                            <label htmlFor="webcam-required" className="form-check-label">Webcam Required</label>
                        </div>

                        {/* Lock Question after Answering */}
                        <div className="form-check">
                            <input type="checkbox" id="lock-question" className="form-check-input"
                                checked={localDetails.settings?.lockQuestionsAfterAnswering || false}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            lockQuestionsAfterAnswering: isChecked,
                                        },
                                    }));
                                }} />
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
                                value={localDetails.settings?.accessCode || ""}
                                onChange={(e) => {
                                    const code = e.target.value;
                                    setLocalDetails((prev: any) => ({
                                        ...prev,
                                        settings: {
                                            ...prev.settings,
                                            accessCode: code,
                                        },
                                    }));
                                }}
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
                                    value={localDetails.dates.due.slice(0, 16)}
                                    onChange={(e) => {
                                        setLocalDetails((prev: any) => ({
                                            ...prev,
                                            dates: {
                                                ...prev.dates,
                                                due: e.target.value,
                                            },
                                        }));
                                    }}
                                />
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
                                        value={localDetails.dates.available.slice(0, 16)}
                                        onChange={(e) => {
                                            setLocalDetails((prev: any) => ({
                                                ...prev,
                                                dates: {
                                                    ...prev.dates,
                                                    available: e.target.value,
                                                },
                                            }));
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="wd-available-until" className="form-label font-weight-bold">Until</label>
                                <div className="input-group">
                                    <input
                                        id="wd-available-until"
                                        type="datetime-local"
                                        className="form-control"
                                        value={localDetails.dates.until.slice(0, 16)}
                                        onChange={(e) => {
                                            setLocalDetails((prev: any) => ({
                                                ...prev,
                                                dates: {
                                                    ...prev.dates,
                                                    until: e.target.value,
                                                },
                                            }));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}