import React, { useState, useRef, useEffect } from "react";
import "./Join.css";
import { initiateSocketConnection } from "../../api/socketio";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const tokenInputRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      initiateSocketConnection(token, () => {
        navigate("/chat");
      });
    }
  }, [token]);

  const submitToken = (e) => {
    e.preventDefault();
    const tokenValue = tokenInputRef.current.value;
    setToken(tokenValue);
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Sing-In</h1>
        <div>
          <input
            placeholder="Enter token"
            className="joinInput"
            ref={tokenInputRef}
            type="text"
          />
        </div>
        <button className={"button mt-20"} type="submit" onClick={submitToken}>
          {" "}
          Sign In
        </button>
      </div>
    </div>
  );
}
