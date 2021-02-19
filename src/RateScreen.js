import React, { useState, useEffect } from "react";

const RateScreen = ({ onDone = (design1Rating, design2Rating) => {} }) => {
  const [design1Rating, setDesign1Rating] = useState(0);
  const [design2Rating, setDesign2Rating] = useState(0);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const design1Change = (val) => {
    setDesign1Rating(val);
  };
  const design2Change = (val) => {
    setDesign2Rating(val);
  };

  useEffect(() => {
    if (!design1Rating && !design2Rating) return;
    if (design1Rating !== 0 && design2Rating !== 0) {
      // done
      setIsReadyToSubmit(true);
    }
  }, [design1Rating, design2Rating]);

  const handleSubmit = () => {
    if (!isReadyToSubmit) return;

    onDone(design1Rating, design2Rating);
  };

  return (
    <div className="intro-screen">
      <h4>How difficult is it to use design 1?</h4>
      <p>1 = effortless, 5 = challenging </p>
      <RatingGroup groupName="design1" onChange={design1Change} />
      <h4>How difficult is it to use design 2?</h4>
      <p>1 = effortless, 5 = challenging </p>
      <RatingGroup groupName="design2" onChange={design2Change} />
      <p>
        <button onClick={handleSubmit}>Submit</button>
      </p>
    </div>
  );
};

function RatingGroup({ groupName, onChange = (val) => {} }) {
  return (
    <div>
      <RateItem groupName={groupName} value={1} onChange={onChange} />
      <RateItem groupName={groupName} value={2} onChange={onChange} />
      <RateItem groupName={groupName} value={3} onChange={onChange} />
      <RateItem groupName={groupName} value={4} onChange={onChange} />
      <RateItem groupName={groupName} value={5} onChange={onChange} />
    </div>
  );
}

function RateItem({ groupName, value, onChange }) {
  return (
    <>
      <label for={groupName + value}>{value}</label>
      <input
        type="radio"
        id={groupName + value}
        name={groupName}
        value={value}
        onChange={() => {
          onChange(parseInt(value));
        }}
      />
    </>
  );
}

export default RateScreen;
