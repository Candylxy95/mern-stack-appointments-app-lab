import React from "react";

const SummaryCard = (props) => {
  return (
    <div className="summaryCard">
      <h2>{props.title}</h2>
      <p>
        {props.date}, {props.time}
      </p>
      <p>
        Location: <span style={{ fontWeight: "bolder" }}>{props.location}</span>
      </p>

      <button onClick={props.onClick}>View</button>
    </div>
  );
};

export default SummaryCard;
