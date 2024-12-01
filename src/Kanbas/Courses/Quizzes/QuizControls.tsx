import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";  
import { useDispatch } from "react-redux";
import { addQuiz } from "./reducer";  
import { initialState } from "./reducer";  

export default function QuizControls() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleAddQuiz = () => {
        const newQuiz = {
            ...initialState.quizzes[0], 
            _id: 1, 
            title: "New Quiz",  
            points: "0", 
            totQuestions: "0 Questions", 
            isPublished: false,  
            questions: [],  
        };

        dispatch(addQuiz(newQuiz));

        navigate(`Add/${newQuiz._id}`);
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
