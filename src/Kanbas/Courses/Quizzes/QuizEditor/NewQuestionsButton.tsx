import { BsPlus } from "react-icons/bs";
 
export default function NewQuestionButton({callback}:{callback:any}){
    return(
        <button
              id="wd-add-assignment-group"
              className="text-nowrap btn btn-lg btn-secondary mt-3 rounded-1"
              onClick={()=>callback()}
            >
              <BsPlus className="me-1 fs-2"/>
              New Question
            </button>
    )
}