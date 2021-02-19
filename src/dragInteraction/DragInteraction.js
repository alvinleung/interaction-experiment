import React, { useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import Selectable from "../selectable/Selectable";
import "./DragInteraction.css";

export default function DragInteraction({
  targetLocation = "above-fold",
  onTargetSelected = () => {},
  onTargetUnselected = () => {},
}) {
  const unitHeight = 4 * 16;
  const marginSize = 16;

  const [initialY, setInitialY] = useState();
  const [selectedItem, setSelectedItem] = useState(0);

  const selectorHeight = useMotionValue(unitHeight);
  const control = useAnimation();

  const selectorDragStart = (e, info) => {
    setInitialY(info.point.y);
  };

  const selectorDragEnd = (e, info) => {
    // snap to nearest value
    const pointerY = info.offset.y + initialY + document.body.scrollTop;
    const snapToY =
      snapPrecision(pointerY - unitHeight, unitHeight) + marginSize;
    control.start({ y: snapToY });

    // calculate the selected item id here
    setSelectedItem(Math.floor(Math.abs(snapToY / unitHeight)));
  };

  return (
    <div className="draggable-container">
      {/* <div>Drag Interaction</div> */}
      <div className="selector-container">
        <motion.div
          className="selector-draggable"
          drag="y"
          dragMomentum={false}
          onDragStart={selectorDragStart}
          onDragEnd={selectorDragEnd}
          animate={control}
          style={{
            height: selectorHeight,
            y: marginSize,
          }}
        />
      </div>
      <Selectable
        count={15}
        selectedItemId={selectedItem}
        onTargetSelected={onTargetSelected}
        onTargetUnselected={onTargetUnselected}
        targetLocation={targetLocation}
      />
    </div>
  );
}

function snapPrecision(val, unitSize) {
  return Math.round(val / unitSize) * unitSize;
}
function snapPrecisionDown(val, unitSize) {
  return Math.floor(val / unitSize) * unitSize;
}
