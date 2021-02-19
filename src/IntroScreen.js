import React, { useState } from "react";
import "./IntroScreen.css";

const IntroScreen = ({ title = "", children, onDone = () => {} }) => {
  const [isDone, setIsDone] = useState(false);
  const handleIntroScreenClick = () => {
    setIsDone(true);
    onDone();
  };
  return (
    <div
      className="intro-screen"
      style={{ display: isDone ? "none" : "block" }}
    >
      <h1>{title}</h1>
      <div>{children}</div>
      <button onClick={handleIntroScreenClick}>Begin</button>
    </div>
  );
};

export default IntroScreen;
