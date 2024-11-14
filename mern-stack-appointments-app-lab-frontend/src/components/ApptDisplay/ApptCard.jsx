import React from "react";

const ApptCard = (props) => {
  return (
    <div className="apptCard">
      <h1>{props.title}</h1>
      <p>
        Type: <span>{props.type}</span>
      </p>
      <p>
        Purpose: <span>{props.purpose}</span>
      </p>
      <p>
        Location: <span>{props.location}</span> {props.address}
      </p>
      <p>
        Attendee: <span>{props.attendee}</span>
      </p>
      <p>
        Date:{" "}
        <span>
          {props.date}, {props.time}
        </span>
      </p>
      <p>
        Comments: <span>{props.comments}</span>
      </p>
      <div>
        <button onClick={props.update}>{props.children}</button>
        <button onClick={props.delete}>Delete</button>
      </div>
    </div>
  );
};

export default ApptCard;
