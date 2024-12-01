import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
export default function QuizControlRightButtons() {
    return (
        <div className="float-end">
            <span className="me-5 position-relative">
                <FaCheckCircle style={{ top: "2px" }}
                    className="text-success me-1 position-absolute fs-3" />
                <FaCircle className="text-white me-1 fs-4" />
            </span>
            <IoEllipsisVertical className="fs-2 me-2" />
        </div>
    );
}
