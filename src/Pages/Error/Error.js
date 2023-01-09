import React from "react";
import "./Error.css";

const Error = () => {
  return (
    <div className="error-bg">
      <h1
        style={{ fontSize: "5em", padding: "10%" }}
        className=" mb-5 text-white mt-5"
      >
        Opps 🤭 <span className="text-danger">404</span> !!!
      </h1>
    </div>
  );
};

export default Error;
