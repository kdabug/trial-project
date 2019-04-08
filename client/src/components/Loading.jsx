import React from "react";
import { eyeAvs } from "../eyeAvs";

export default props => {
  const { show } = props;
  console.log("this is loading eyeAvs", eyeAvs);
  return (
    <>
      {show && (
        <>
          {eyeAvs.map((pic, i) => (
            <div className="loading-pic-container" key={i}>
              <img src={pic.src} />
            </div>
          ))}
        </>
      )}
    </>
  );
};
