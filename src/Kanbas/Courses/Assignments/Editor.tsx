import { useState, useEffect } from 'react';
//import { FaChevronDown, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addAssignment, updateAssignment } from './reducer';
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
  const assignment = assignments.find((a: any) => a._id === aid);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Set up state variables with default values to avoid conditional hook calls
  const [title, setTitle] = useState('Unititled Assignment');
  const [description, setDescription] = useState('No description');
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');

  // Populate state only if assignment exists, using useEffect
  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description);
      setPoints(assignment.points);
      setDueDate(new Date(assignment.due).toISOString().slice(0, 16));
      setAvailableFrom(new Date(assignment.not_available_until).toISOString().slice(0, 16));
      setAvailableUntil(new Date(assignment.not_available_until).toISOString()); // Set based on assignment if available
    }
  }, [assignment]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Handle save action
  const handleSave = async () => {
    const assignmentExists = assignments && assignments.find((a: any) => a._id === aid);

    if (!assignmentExists) {
      // Create a new assignment
      const newAssignment = {
        _id: aid, // Existing ID or a new unique ID
        course: cid,
        title,
        description,
        points,
        due: formatDate(new Date(dueDate).toISOString()),
        not_available_until: formatDate(new Date(availableFrom).toISOString()),
        available_until: formatDate(new Date(availableFrom).toISOString()),
      };
      console.log(newAssignment);
      if (cid) {
        console.log("Frontend aid: ", aid); 
        const assignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
        dispatch(addAssignment(assignment));
      }
    } else {
      const updatedAssignment = {
        ...assignmentExists,
        title,
        description,
        points,
        due: formatDate(new Date(dueDate).toISOString()),
        not_available_until: formatDate(new Date(availableFrom).toISOString()),
        available_until: formatDate(new Date(availableFrom).toISOString()),
      };
      console.log(updatedAssignment);
      await assignmentsClient.updateAssignment(updatedAssignment);
      dispatch(updateAssignment(updatedAssignment));
    }
    // Navigate back after save
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };


  return (
    <div id="wd-assignments-editor" className="container mt-4">
      {/* Assignment Name */}
      <div className="row mb-2">
        <div className="col">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input
            id="wd-name"
            value={title}
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      {/* Assignment Description */}
      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea
            cols={50}
            rows={10}
            id="wd-description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Points */}
      <div className="row mb-2">
        <div className="col-md-3 d-flex align-items-center justify-content-end">
          <label htmlFor="wd-points" className="form-label">Points</label>
        </div>
        <div className="col-md-9">
          <input
            id="wd-points"
            type="number"
            value={points}
            className="form-control"
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Due Date */}
      <div className="row mb-3">
        <div className="col-md-3 d-flex justify-content-end">
          <label className="form-label font-weight-bold">Due</label>
        </div>
        <div className="col-md-9">
          <input
            id="wd-due-date"
            type="datetime-local"
            value={dueDate}
            className="form-control"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      {/* Available From */}
      <div className="row mb-3">
        <div className="col-md-3 d-flex justify-content-end">
          <label className="form-label font-weight-bold">Available from</label>
        </div>
        <div className="col-md-9">
          <input
            id="wd-available-from"
            type="datetime-local"
            value={availableFrom}
            className="form-control"
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>
      </div>

      {/* Available Until */}
      <div className="row mb-3">
        <div className="col-md-3 d-flex justify-content-end">
          <label className="form-label font-weight-bold">Until</label>
        </div>
        <div className="col-md-9">
          <input
            id="wd-available-until"
            type="datetime-local"
            value={availableUntil}
            className="form-control"
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <hr />
      <div className="row">
        <div className="col text-end">
          <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
            <button className="btn btn-secondary me-2">Cancel</button>
          </Link>
          <button className="btn btn-danger" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}