export default function CancelSaveButtons(){
    return(
        <div className="d-flex">
            <button
              id="wd-add-assignment-group"
              className="text-nowrap btn btn-lg btn-secondary m-3"
            >
              Cancel
            </button>
            <button
              id="wd-add-assignment-group"
              className="text-nowrap btn btn-lg btn-danger m-3"
            >
              Save
            </button>
        </div>
    )
}