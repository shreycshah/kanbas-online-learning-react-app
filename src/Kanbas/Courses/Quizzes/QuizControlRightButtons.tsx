import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FcCancel } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function QuizControlRightButtons({ quizId, deleteQuiz, isPublished }:
    { quizId: string; deleteQuiz: (quizId: string) => void; isPublished: boolean }) {
    const handleDelete = () => {
        const confirmed = window.confirm("Are you sure you want to delete this assignment?");
        if (confirmed) {
            deleteQuiz(quizId);
        }
    };
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div className="float-end">
            {currentUser && currentUser?.role == "FACULTY" && (
                <>
                    <FaTrash className="text-danger me-2 mb-1" onClick={handleDelete} />
                </>
            )}
            {isPublished ? <FcCancel className="text-danger me-2 mb-1" /> : <GreenCheckmark />}
            <IoEllipsisVertical className="fs-2 me-2" />
        </div>
    );
}
