import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const [module, setModule] = useState({
        id: "1",
        name: "Learning NodeJS",
        description: "Learn how to create a NodeJS server",
        course: "Web Development"
    });
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${ASSIGNMENT_API_URL}`}>
                Get Assignment
            </a><hr />
            <h4>Retrieving Assignment Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${ASSIGNMENT_API_URL}/title`}>
                Get Title
            </a><hr />
            <h4>Modifying Assignment Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                    setAssignment({ ...assignment, title: e.target.value })} />
            <hr />
            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input className="form-control w-75" id="wd-assignment-score"
                type="number" defaultValue={assignment.score}
                onChange={(e) => {
                    const scoreValue = parseFloat(e.target.value) || 0; // Convert to number or set to 0 if invalid
                    setAssignment({ ...assignment, score: scoreValue });
                }} />
            <hr />
            <a
                id="wd-update-assignment-completed"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
            >
                Update Completed
            </a>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-assignment-completed"
                    checked={assignment.completed}
                    onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="wd-assignment-completed">
                    Completed
                </label>
            </div>
            <hr />

            <a id="wd-retrieve-modules" className="btn btn-primary"
                href={`${MODULE_API_URL}`}>
                Get Module
            </a><hr />
            <h4>Retrieving Module Properties</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
                href={`${MODULE_API_URL}/name`}>
                Get Name
            </a><hr />
            <h4>Modifying Module Properties</h4>
            <a id="wd-update-module-name"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input className="form-control w-75" id="wd-module-name"
                defaultValue={module.name} onChange={(e) =>
                    setModule({ ...module, name: e.target.value })} />
            <hr />
            <a id="wd-update-module-description"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/description/${module.description}`}>
                Update Description
            </a>
            <input className="form-control w-75" id="wd-module-description"
                defaultValue={module.description} onChange={(e) =>
                    setModule({ ...module, description: e.target.value })} />
            <hr />
        </div>
    );
}
