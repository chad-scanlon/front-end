import React from "react";

const Session = (props) => {
  return (
    <>
      <div className="classes">
        <p>{props.name}</p>
        <p>{props.type}</p>
        <p>For {props.duration}</p>
        <p>At {props.startTime}</p>
        <p>Intensity: {props.intensityLevel}</p>
        <p>In {props.location}</p>
        <p>{props.attendees} signed up</p>
        <p>{props.maxClassSize} attendees max</p>
      </div>
    </>
  );
};

export default Session;
