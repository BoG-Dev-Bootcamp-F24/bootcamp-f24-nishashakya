import React from 'react';

const Train = ({ DESTINATION, DIRECTION, LINE, WAITING_TIME, DELAY }) => {

  const isOnTime = DELAY === "T0S";
  
  return (
    <div className="train-card">
      <h2>{DESTINATION}</h2>
      <p>Direction: {DIRECTION}</p>
      <p>Line: {LINE}</p>
      <p>Waiting Time: {WAITING_TIME}</p>
      <p>Status: {isOnTime ? "On Time" : "Delayed"}</p>
    </div>
  );
};

export default Train;