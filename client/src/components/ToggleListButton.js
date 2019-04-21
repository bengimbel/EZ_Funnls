import React from "react";

const ToggleListButton = props => {
  const buttonTabTitle = props.searchTabTitle
    ? "Show Visited Resturants"
    : "Show Searched Resturants";
  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <button
            className="btn btn-danger"
            onClick={() => props.switchSearchTerm()}
          >
            {buttonTabTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleListButton;
