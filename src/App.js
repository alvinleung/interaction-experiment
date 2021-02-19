import React, { useState, useRef } from "react";
import { Router } from "@reach/router";
import "./App.css";
import "./variables.css";
import Test from "./Test";
import IntroScreen from "./IntroScreen";
import EndScreen from "./EndScreen";

const EACH_DESIGN_TASK_ATTEMPTS = 6;
const ENDING_TASK_ATTEMPTS = 12;
const FOLD_ATTEMPTS = 3;

function App() {
  // const [record, setRecord] = useState([]);
  const record = useRef([]);

  const foldCount = useRef([0, 0]);

  const perferredBeginDesign =
    window.location.hash === "#scroll" ? "scroll" : "drag";

  // const [currentTest, setCurrentTest] = useState(generateNextTest("scroll"));
  const [currentPage, setCurrentPage] = useState(generateIntroScreen());
  const testingDesign = useRef(perferredBeginDesign);
  const completedTaskCount = useRef(0);

  function generateIntroScreen() {
    const handleIntoFinish = () => {
      // generate a test
      setCurrentPage(generateNextTest(testingDesign.current));
    };
    return (
      <IntroScreen onDone={handleIntoFinish} title="Intro">
        <h4>Goal of this experiment</h4>
        <p>
          The goal of this experiment is to compare and evalute the user
          experience of two different user interface interaction of the same
          task on smartphones.
        </p>
        <p>
          The test is not intended to evaluate your performance on the task,
          rather it is aimed to gain insight into the design choices of the
          system.
        </p>
        <h4>The task</h4>
        <p>
          In the next few screens, you will be presented a list of time slots
          each has different amout of people. Your task will be selecting the
          time slot which has the <em>highest amount</em> of people in it.
        </p>
        <p>You will be asked to complete the task 5 times.</p>
      </IntroScreen>
    );
  }

  function generateSwitchDesignScreen() {
    const handleIntoFinish = () => {
      // generate a test
      setCurrentPage(generateNextTest(testingDesign.current));
    };
    return (
      <IntroScreen onDone={handleIntoFinish} title="Switching Design">
        <h4>Thanks for completing the first half</h4>
        <p>
          You will be asked to complete the same task(selecting the time slot
          which has the <em>highest amount</em> of people) but with the new
          design 5 times.
        </p>
        <p>
          *note: The interface might look similar visually, but the interaction
          is different.
        </p>
      </IntroScreen>
    );
  }

  function generateNextTest(design) {
    const currentTask = completedTaskCount.current + 1;
    const fold = (() => {
      // select fold
      const randomFold = Math.round(Math.random());
      let resultFold = randomFold;

      if (completedTaskCount.current === EACH_DESIGN_TASK_ATTEMPTS) {
        // reset the fold the the task changes
        foldCount.current[0] = 0;
        foldCount.current[1] = 0;
      }

      if (foldCount.current[randomFold] < FOLD_ATTEMPTS) {
        resultFold = randomFold;
      } else {
        resultFold = randomFold === 1 ? 0 : 1;
      }

      foldCount.current[resultFold] += 1;

      console.log(resultFold);
      console.log(foldCount.current);

      return resultFold === 0 ? "above-fold" : "below-fold";
    })();
    console.log(fold);
    const testName = "Task " + currentTask;
    const isFirstTest = false;
    return (
      <Test
        key={Math.random()}
        onFinishTest={handleTaskComplete}
        design={design}
        testType={fold}
        testName={testName}
      />
    );
  }
  function incrementTaskCount() {
    completedTaskCount.current += 1;
  }

  function handleTaskComplete(time, design, type, errorCount) {
    // save the task to the record
    record.current.push({
      time: time,
      design: design,
      type: type,
      errorCount: errorCount,
    });
    // next test
    incrementTaskCount();

    if (completedTaskCount.current === EACH_DESIGN_TASK_ATTEMPTS) {
      changeDesign();
      setCurrentPage(generateSwitchDesignScreen());
      return;
    }
    if (completedTaskCount.current === ENDING_TASK_ATTEMPTS) {
      setCurrentPage(<EndScreen result={record.current} />);
      return;
    }
    setCurrentPage(generateNextTest(testingDesign.current));
  }

  function changeDesign() {
    if (testingDesign.current === "scroll") {
      testingDesign.current = "drag";
      return;
    }
    if (testingDesign.current === "drag") {
      testingDesign.current = "scroll";
      return;
    }
  }

  return <div className="App">{currentPage}</div>;
}

export default App;
