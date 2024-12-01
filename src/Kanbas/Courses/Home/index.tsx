import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="container" id="wd-home">
      <div className="row">
        <div className="col-md-8">
          <Modules />
        </div>
        <div className="col-md-4">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}