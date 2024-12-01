import React from "react";
import { MdDoNotDisturbAlt, MdWeb, MdAnnouncement, MdAnalytics, MdNotificationsActive } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function CourseStatus() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      {currentUser && currentUser?.role == "FACULTY" && (
        <>
          <h2>Course Status</h2>
          <div className="d-flex">
            <div className="w-50 pe-1">
              <button className="btn btn-sm btn-secondary w-100 text-nowrap">
                <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
              </button>
            </div>
            <div className="w-50">
              <button className="btn btn-sm btn-success w-100">
                <FaCheckCircle className="me-2 fs-5" /> Publish
              </button>
            </div>
          </div><br />
          <button className="btn btn-sm btn-secondary w-100 mt-1 text-start">
            <BiImport className="me-2 fs-5" /> Import Existing Content
          </button>
          <button className="btn btn-sm btn-secondary w-100 mt-1 text-start">
            <BiImport className="me-2 fs-5" /> Import from Commons
          </button>
          <button className="btn btn-sm btn-secondary w-100 mt-1 text-start">
            <MdWeb className="me-2 fs-5" /> Choose Home Page
          </button>
        </>
      )}
      <button className="btn btn-sm btn-secondary w-100 mt-1 text-start">
        <MdWeb className="me-2 fs-5" /> View Course Stream
      </button>
      <button className="btn btn-sm btn-secondary w-100 mt-1 text-start">
        <MdAnnouncement className="me-2 fs-5" /> View Announcement
      </button>
      <button className="btn btn-sm btn-secondary w-100 mt-1 text-start">
        <MdAnalytics className="me-2 fs-5" /> View Analytics
      </button>
      <button className="btn btn-sm btn-secondary w-100 mt-1 text-start">
        <MdNotificationsActive className="me-2 fs-5" /> View Course Notifications
      </button>
    </div>
  );
}