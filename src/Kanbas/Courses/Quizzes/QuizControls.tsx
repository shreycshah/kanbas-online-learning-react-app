import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsSearch } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useSelector } from "react-redux";

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

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div className="d-flex justify-content-between align-items-center mb-2" style={{ width: '100%' }}>
            {/* Search Bar with Icon */}
            <div className="input-group" style={{ width: '40%' }}> {/* Adjust width as needed */}
                <span className="input-group-text">
                    <BsSearch />
                </span>
                <input type="search" className="form-control" placeholder="Search..." />
            </div>

            {currentUser && currentUser?.role == "FACULTY" && (
                <div className="buttons d-flex gap-2">
                    {/* Add Group Button */}
                    <button className="btn btn-sm btn-secondary d-flex align-items-center">
                        <FaPlus className="me-2" /> Group
                    </button>

                    {/* Add Assignment Button */}
                    <button className="btn btn-sm btn-danger d-flex align-items-center" onClick={handleAddQuiz}>
                        <FaPlus className="me-2" />Quiz
                    </button>
                </div>
            )}

        </div>
    );
}
