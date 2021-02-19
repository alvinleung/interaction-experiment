import { useMemo } from "react";

function useTaskTimer(doneCallback = (taskTime) => {}) {
  const taskBeginTime = useMemo(() => Date.now(), []);

  const finishTask = () => {
    doneCallback(Date.now() - taskBeginTime);
  };

  return finishTask;
}

export default useTaskTimer;
