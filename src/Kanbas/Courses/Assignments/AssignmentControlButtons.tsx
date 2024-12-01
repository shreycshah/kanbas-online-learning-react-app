import React from "react";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end d-flex align-items-center">
      <div style={{
          border: '1px solid black',  // Black border
          borderRadius: '20px',       // Rounded corners
          padding: '5px 10px',       // Padding inside the box for text spacing
          margin: '0 10px'           // Margin to separate from icons
      }}>
        40% of Total
      </div>
      <BsPlus className="fs-4 me-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}