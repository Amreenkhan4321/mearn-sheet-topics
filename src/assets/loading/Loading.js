import React from "react";
import loading_icon from "../images/Loading_icon.gif";
import ClipLoader from "react-spinners/ClipLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import CircleLoader from "react-spinners/CircleLoader";
const Loading = () => {
  return (
    <div className="loading_comp">
      {/* <img src={loading_icon} className="loading_img" />
      <h1 className="loading-text">Please Wait ...</h1> */}
      {/* <ClipLoader color="#b768a3" loading="loading" size={50} /> */}
      {/* <ClimbingBoxLoader color="rgba(54, 215, 183, 1)" /> */}
      <CircleLoader color="#36d7b7" size={80} />
    </div>
  );
};

export default Loading;
