import React, { useState } from 'react';
import MCQEditor from "./MCQEditor";
import TrueFalseEditor from "./TrueFalseEditor"; // Import TrueFalse component
import FillInTheBlankEditor from "./FillInTheBlankEditor"; // Import FillInTheBlanks component

export default function QuestionParentForm() {
  const [selectedType, setSelectedType] = useState<string>('3'); // Default to 'Multiple Choice'

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value); // Update selected question type
  };

  const renderComponent = () => {
    switch (selectedType) {
      case '1':
        return <TrueFalseEditor />;
      case '2':
        return <FillInTheBlankEditor />;
      case '3':
      default:
        return <MCQEditor />;
    }
  };

  return (
    <div className="border border-dark rounded-1 p-3 mt-3">
      <div className="d-flex justify-content-center align-items-center mt-2">
        <input
          id="wd-question-title"
          placeholder='Question Title'
          className="form-control me-1 border border-secondary"
        />
        <select
          id="wd-question-group"
          className="form-select ms-1 me-5 border border-secondary"
          value={selectedType} // Bind the select element to the state
          onChange={handleChange} // Handle the change event
        >
          <option value="3">Multiple Choice</option>
          <option value="1">True or False</option>
          <option value="2">Fill in the Blanks</option>
        </select>
        <label htmlFor="wd-question-pts" className="form-label ms-5">
          pts:
        </label>
        <input
          id="wd-question-pts"
          className="form-control"
          value={0}
          style={{ width: '60px' }}
        />
      </div>
      <hr />
      {renderComponent()} {/* Conditionally render the appropriate component */}
      <hr />
      <div className="d-flex">
        <button
          id="wd-add-assignment-group"
          className="text-nowrap btn btn-secondary mt-2 ms-2"
        >
          Cancel
        </button>
        <button
          id="wd-add-assignment-group"
          className="text-nowrap btn btn-danger mt-2 ms-2"
        >
          Update Question
        </button>
      </div>
    </div>
  );
}
