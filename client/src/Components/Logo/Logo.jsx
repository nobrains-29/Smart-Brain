import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma2 mt0 dib fl pa3">
      <Tilt
        className="Tilt br2 shadow-1"
        options={{ max: 55 }}
        style={{ height: 110, width: 110 }}
      >
        <div className="Tilt-inner pa2">
          <img style={{ padding: "2px" }} alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
