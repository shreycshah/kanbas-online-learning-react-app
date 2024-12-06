import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enroll, unenroll } from "./enrollmentsReducer";
import * as userClient from "./Account/client";

export default function Dashboard({ courses, course, allCourses, setCourse, addNewCourse,
  deleteCourse, updateCourse, fetchCourses, fetchAllCourses }: {
    courses: any[]; course: any; allCourses: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; fetchCourses: () => void; fetchAllCourses: () => void;
  }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEnrolled = (courseId: any) => courses.find(
    (course: any) => course._id === courseId
  );

  const [coursesToDisplay, setCoursesToDisplay] = useState<any[]>([]);

  useEffect(() => {
    setCoursesToDisplay(showAllCourses ? allCourses : courses);
  }, [courses, showAllCourses]);

  const unenrollStudent = async (course: any) => {
    await userClient.unenrollFromCourse(currentUser._id, course._id);
    await fetchCourses();
    await fetchAllCourses();
  };
  const enrollStudent = async (course: any) => {
    await userClient.enrollIntoCourse(currentUser._id, course._id);
    await fetchCourses();
    await fetchAllCourses();
  };


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <h5>New Course
          <button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={addNewCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
            onClick={updateCourse} id="wd-update-course-click">
            Update
          </button>
        </h5>
      )}
      {currentUser?.role === "FACULTY" && (
        <>
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} /> <br />
        </>
      )}

      {/* Enrollment Button for Students */}
      {currentUser?.role === "STUDENT" && (
        <button className="btn btn-info float-end" onClick={() => setShowAllCourses(!showAllCourses)}>
          Enrollments
        </button>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {coursesToDisplay
            .map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <div>
                    <img src={course.image} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                      {isEnrolled(course._id) && (
                        <>
                          <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${course._id}/Home`)}> Go </button>
                        </>
                      )}
                      {currentUser?.role === "FACULTY" && (
                        <>
                          <button onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                          </button>
                          <button id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end" >
                            Edit
                          </button>
                        </>
                      )}
                      {showAllCourses && currentUser?.role === "STUDENT" && isEnrolled(course._id) && (
                        <>
                          <button className="btn btn-danger float-end" onClick={() => unenrollStudent(course)}>
                            Unenroll
                          </button>
                        </>
                      )}
                      {showAllCourses && currentUser?.role === "STUDENT" && !isEnrolled(course._id) && (
                        <>
                          <button className="btn btn-success float-end" onClick={() => enrollStudent(course)}>
                            Enroll
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}