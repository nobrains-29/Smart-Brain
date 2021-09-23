import React from "react";

const Rank = (props) => {
  return (
    <div>
      <div className="white f2">
        {`${props.name}, your current entry count is...`}
      </div>
      <div className="white f3">
        <h1>#{props.entries}</h1>
      </div>
    </div>
  );
};

export default Rank;
