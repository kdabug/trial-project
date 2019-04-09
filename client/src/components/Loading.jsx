import React from "react";
import { eyeAvs } from "../eyeAvs";

export default props => {
  const { show } = props;
  console.log("this is loading eyeAvs", eyeAvs);
  //debugger;
  return (
    <>
      {show && (
        <>
          {eyeAvs.map((pic, i) => (
            <div
              className="loading-pic-container"
              style={{
                // top: "100px",
                // left: "100px"
                top: `${Math.random() * window.innerHeight}` + "px",
                left: `${Math.random() * window.innerWidth}` + "px"
              }}
              key={i}
            >
              <div className={`avatar-${pic.id}`} />
            </div>
          ))}
        </>
      )}
    </>
  );
};
