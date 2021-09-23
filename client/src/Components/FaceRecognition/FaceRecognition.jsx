import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = (props) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={props.imgURL}
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: props.box.topRow,
            right: props.box.rightCol,
            bottom: props.box.bottomRow,
            left: props.box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
