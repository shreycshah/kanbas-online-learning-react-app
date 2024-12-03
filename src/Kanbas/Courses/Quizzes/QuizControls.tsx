import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams, useNavigate } from 'react-router-dom'; 

export default function QuizControls() {

    const { cid } = useParams();
    const navigate = useNavigate();
    
    function generateUniqueId() {
        const now = new Date();
        const datePart = now.toISOString().replace(/[-:.TZ]/g, ''); // Removes dashes, colons, periods, 'T', 'Z'
        const randomPart = Math.floor(Math.random() * 10000); // Generates a random 6-digit number
        return `${datePart}${randomPart}`;
    }
    const handleAddQuiz = () => {
        const newId = generateUniqueId();
        navigate(`/Kanbas/Courses/${cid}/Quizzes/Edit/${newId}`);
    };

    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
                <IoEllipsisVertical />
            </button>
            <button
                id="wd-add-module-btn"
                className="btn btn-lg btn-danger me-1 float-end"
                onClick={handleAddQuiz}  
            >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </button>
        </div>
    );
}
