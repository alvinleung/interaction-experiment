import React from "react";
import "./EndScreen.css";

const EndScreen = ({ result, design1Rating, design2Rating }) => {
  return (
    <div className="intro-screen">
      <h1>Thanks for your participation!</h1>
      <p>
        please screen capture the following result and send it back to Alvin
      </p>
      {/* { time: time, design: design, type: type, errorCount: errorCount } */}
      {result.map((record) => {
        return (
          <div className="record">
            <div className="record__item">{record.design}</div>
            <div className="record__item record__item--number">
              {record.time / 1000}s
            </div>
            <div className="record__item record__item--number">
              {record.type}
            </div>
            <div className="record__item  record__item--number">
              {record.errorCount}
            </div>
          </div>
        );
      })}
      <p>
        <div>
          Difficulty: d1 = {design1Rating}, d2 = {design2Rating}
        </div>
        <div>
          ScreenSize: {window.innerWidth}x{window.innerHeight}
        </div>
        <div>Device: {navigator.platform}</div>
      </p>
    </div>
  );
};

export default EndScreen;
