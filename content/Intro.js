import React from "react";
import Total from "./Total";

const Intro = () => {
  return (
    <div className="main__text">
      <h1 role="heading">
        Jackal
        <sup>
          <Total />
        </sup>
      </h1>
    </div>
  );
};

export default Intro;
