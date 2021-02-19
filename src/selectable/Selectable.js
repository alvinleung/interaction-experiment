import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import "./Selectable.css";

const Selectable = ({
  selectedItemId,
  count,
  targetLocation = "above-fold",
  onTargetSelected = () => {},
  onTargetUnselected = () => {},
}) => {
  // const MAX_NUMBER = useMemo(() => Math.random() * 300, []);
  const MAX_NUMBER = useMemo(() => Math.random() * 100, []);

  const [targetSelectionUpdate, forceUpdate] = useState(0);

  const generateItems = useCallback(() => {
    // generate a list of base item
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(Math.random() * (MAX_NUMBER - 1));
    }

    // calculate the fold line
    const foldLine = window.innerHeight;
    const foldLineItemPosition = Math.round(foldLine / (16 * 4));
    // create the target item
    if (targetLocation === "above-fold") {
      items[
        Math.round(Math.random() * (foldLineItemPosition - 1)) + 1
      ] = MAX_NUMBER;
    } else if (targetLocation === "below-fold") {
      console.log(foldLineItemPosition);
      items[
        Math.round(Math.random() * (items.length - foldLineItemPosition)) +
          foldLineItemPosition
      ] = MAX_NUMBER;
    }

    return items;
  }, [count]);
  const [items, setItems] = useState(generateItems());
  const isTargetSelected = useRef(false);

  // check if the user has selected the right one
  useEffect(() => {
    items.forEach((itemNumberValue, i) => {
      const isItemTarget = itemNumberValue === MAX_NUMBER;
      if (isItemTarget) {
        // selected the right one
        if (selectedItemId === i) onTargetSelected();
        else onTargetUnselected();
      }
    });
  }, [selectedItemId]);

  return (
    <div className="selectable-container">
      {items.map((itemNumberValue, index) => {
        const isItemTarget = itemNumberValue === MAX_NUMBER;

        const percentage = itemNumberValue / MAX_NUMBER;

        return (
          <div
            key={index}
            style={{
              backgroundColor: `rgba(88, 231, 222,${percentage / 2})`,
            }}
            className={
              isItemTarget
                ? "selectable-item selectable-item--target"
                : "selectable-item"
            }
          >
            <div className="selectable-item__time">
              {get12HourString(index + 8)}
            </div>
            <div className="selectable-item__people">
              {Math.round(itemNumberValue)} people
            </div>
          </div>
        );
      })}
    </div>
  );
};

function get12HourString(currentHour) {
  if (currentHour > 12) return `${currentHour - 12} pm`;
  else if (currentHour === 12) return `12 pm`;
  else return `${currentHour} am`;
}

export default Selectable;
