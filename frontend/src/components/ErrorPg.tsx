import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPg.css";

const ErrorPg = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1 className="text-white">
        Error 404. <br /> No such page was found.
      </h1>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back to homepage
      </button>
    </div>
  );
};

export default ErrorPg;
