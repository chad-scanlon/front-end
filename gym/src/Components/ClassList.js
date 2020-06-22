import React, { useState, useEffect, useContext } from "react";
import { InitialContext } from "../contexts/InitialContext";
import Session from "./Session";

const ClassList = () => {
  const { session, reserveClass } = useContext(InitialContext);
  console.log(session);

  return (
    <>
      <div>
        {session.map((sesh) => (
          <Session
            key={sesh.id}
            name={sesh.name}
            type={sesh.type}
            duration={sesh.duration}
            startTime={sesh.startTime}
            intensityLevel={sesh.intensityLevel}
            location={sesh.location}
            attendees={sesh.attendees}
            maxClassSize={sesh.maxClassSize}
          />
        ))}
      </div>
    </>
  );
};

export default ClassList;
