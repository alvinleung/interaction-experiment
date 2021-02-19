import React, { useState } from "react";
import useTaskTimer from "./useTaskTimer";
import DragInteraction from "./dragInteraction/DragInteraction";
import ScrollInteraction from "./scrollInteraction/ScrollInteraction";

const Test = ({
  onFinishTest,
  testName = "My Task",
  testType = "above-fold",
  design = "scroll",
}) => {
  const [isTestDone, setIsTestDone] = useState(false);
  const [hasTargetSelected, setTargetSelected] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [timeToFinish, setTimeToFinish] = useState();

  const finishTestHandler = () => {
    onFinishTest(timeToFinish, testType, design, errorCount);
  };
  const handleTestFinish = (time) => {
    setIsTestDone(true);
    setTimeToFinish(time);
  };
  const finishTask = useTaskTimer(handleTestFinish);

  const handleSelected = () => {
    setTargetSelected(true);
  };
  const handleUnselected = () => {
    setTargetSelected(false);
  };

  const incrementErrorCount = () => {
    setErrorCount(errorCount + 1);
  };

  const submitTest = () => {
    if (hasTargetSelected) {
      finishTask();
    } else {
      // wrong answer
      incrementErrorCount();
    }
  };

  const testingInterface = () => {
    return (
      <>
        {design === "scroll" && (
          <ScrollInteraction
            targetLocation={testType}
            onTargetSelected={handleSelected}
            onTargetUnselected={handleUnselected}
          />
        )}
        {design === "drag" && (
          <DragInteraction
            targetLocation={testType}
            onTargetSelected={handleSelected}
            onTargetUnselected={handleUnselected}
          />
        )}
        <div className="test-submit-container">
          <button onClick={submitTest}>Select</button>
        </div>
      </>
    );
  };

  const completedInterface = () => {
    // done interface here
    return (
      <div>
        <h1>{testName} completed</h1>
        <button onClick={finishTestHandler}>Next</button>
      </div>
    );
  };

  return (
    <>
      {!isTestDone && testingInterface()}
      {isTestDone && completedInterface()}
    </>
  );
};

export default Test;
