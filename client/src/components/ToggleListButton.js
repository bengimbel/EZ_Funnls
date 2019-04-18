import React from "react";

const ToggleListButton = props => {
  const buttonTabTitle = props.searchTab
    ? "Show Vistied Resturants"
    : "Show Searched Resturants";
  return (
    <div>
      <button
        className="btn btn-danger"
        onClick={() => props.switchSearchTerm()}
      >
        {buttonTabTitle}
      </button>
    </div>
  );
};

export default ToggleListButton;
