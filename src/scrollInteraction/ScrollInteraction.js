import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import Selectable from "../selectable/Selectable";
import "./ScrollInteraction.css";

export default function ScrollInteraction({
  targetLocation = "above-fold",
  onTargetSelected = () => {},
  onTargetUnselected = () => {},
}) {
  const unitHeight = 4 * 16;
  const marginSize = 16;

  const [selectorY, setSelectorY] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const selectorHeight = useMotionValue(unitHeight);
  const control = useAnimation();

  const selectorDragStart = (e, info) => {
    // setInitialY(info.point.y);
  };

  const selectorDragEnd = (e, info) => {
    // snap to nearest value
    const pointerY = info.offset.y + selectorY;
    const snapToY = snapPrecision(pointerY, unitHeight);
    control.start({ y: snapToY });
    setSelectorY(snapToY);

    // calculate the selected item id here
    setSelectedItem(Math.abs(snapToY / unitHeight));
  };

  useEffect(() => {
    // when item is selected
  }, [selectedItem]);

  return (
    <div className="scrollable-container">
      {/* <div>Drag Interaction</div> */}
      <div className="selector-container">
        <motion.div
          className="selector-draggable selector-draggable--scroll"
          style={{ y: marginSize }}
        />
      </div>
      <motion.div
        drag="y"
        dragMomentum={false}
        onDragStart={selectorDragStart}
        onDragEnd={selectorDragEnd}
        animate={control}
        // style={{
        //   height: selectorHeight,
        //   y: marginSize,
        // }}
      >
        <Selectable
          count={15}
          targetLocation={targetLocation}
          selectedItemId={selectedItem}
          onTargetSelected={onTargetSelected}
          onTargetUnselected={onTargetUnselected}
        />
      </motion.div>
    </div>
  );
}

function snapPrecision(val, unitSize) {
  return Math.round(val / unitSize) * unitSize;
}
function snapPrecisionDown(val, unitSize) {
  return Math.floor(val / unitSize) * unitSize;
}
