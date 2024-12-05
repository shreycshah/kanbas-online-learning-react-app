import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function QuizControlRightButtons({ quizId, deleteQuiz, isPublished, negatePublishStatus }:
    { quizId: string; deleteQuiz: (quizId: string) => void; isPublished: boolean; negatePublishStatus: (quizId: string) => void; }) {
    const navigate = useNavigate();
    const { cid } = useParams();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this quiz?");
        if (confirmed) {
            deleteQuiz(quizId);
        }
    };
    const handleEdit = () => {
        console.log("Edit quiz: ", quizId);
        navigate(`Edit/${quizId}`); // Navigate to the Edit page
    };

    const handlePublish = () => {
        negatePublishStatus(quizId);
    };

    return (
        <div className="float-end">
            {isPublished ? <GreenCheckmark /> : <FcCancel className="text-danger me-2 position-relative"
                style={{ fontSize: "1.25rem", top: "2px" }} />}
            <IoEllipsisVertical className="fs-4 me-2" onClick={toggleDropdown} style={{ cursor: "pointer" }} />
            {dropdownOpen && (
                <div
                    className="dropdown-menu position-absolute"
                    style={{
                        top: "100%",
                        right: "0",
                        display: "block",
                        zIndex: 1000,
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <button className="dropdown-item" onClick={handlePublish}>
                        {isPublished ? "Unpublish" : "Publish"}
                    </button>
                    <button className="dropdown-item" onClick={handleEdit}>
                        Edit
                    </button>
                    <button className="dropdown-item" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
