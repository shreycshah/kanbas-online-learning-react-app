import React from "react";
import AssignmentControl from "./AssignmentControl";
import { BsGripVertical } from "react-icons/bs";
import { FaBook } from 'react-icons/fa';
import { GoTriangleDown } from "react-icons/go";
import AssignmentLevelControl from "./AssignmentLevelControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAssignments, deleteAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
    const { cid } = useParams(); // retrieve the course ID from the route
    //const assignments = db.assignments.filter(assignment => assignment.course === cid); // filter assignments for this course
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };


    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div>
            <AssignmentControl />
            <div className="wd-assignments-title p-3 ps-2 bg-secondary" style={{ color: 'black', border: '1px solid black' }}>
                <BsGripVertical className="me-2 fs-3" /> <GoTriangleDown />
                <strong>ASSIGNMENTS</strong><AssignmentControlButtons /></div>
            <ul className="wd-assignments-list list-group rounded-0">
                {assignments.map((assignment: any) => (
                    <li key={assignment._id} className="wd-assignment-list-item list-group-item d-flex align-items-center" style={{ border: '1px solid black', color: 'black' }}>
                        <BsGripVertical className="text-muted me-2 fs-5" />
                        <FaBook style={{ marginRight: 10, color: 'green' }} />
                        <div className="flex-grow-1">
                            {currentUser && currentUser?.role == "FACULTY" && (
                                <>
                                    <a href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} style={{ color: 'black' }}>
                                        <strong>{assignment.title}</strong>
                                    </a>
                                </>
                            )}
                            {currentUser && currentUser?.role != "FACULTY" && (
                                <>
                                    <strong>{assignment.title}</strong>
                                </>
                            )}
                            <div className="small">
                                <span style={{ color: 'red' }}>Multiple Modules</span> | <strong>Not available until</strong> {assignment.not_available_until}
                            </div>
                            <div className="small">
                                <strong>Due</strong> {assignment.due} | {assignment.points} pts
                            </div>
                        </div>
                        <AssignmentLevelControl assignmentId={assignment._id}
                            deleteAssignment={(assignmentId) => { removeAssignment(assignmentId)}} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
