import React, { useState, useRef, useEffect } from "react";
import "./Join.css";
import { initiateSocketConnection } from "../../api/socketio";
import { useNavigate } from "react-router-dom";

// Join component
export default function Join() {
  // State for the token and token input reference
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const tokenInputRef = useRef("");
  // React Router's useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Effect hook to initiate socket connection when the component mounts
  useEffect(() => {
    // If a token exists, initiate socket connection and navigate to chat page
    if (token) {
      initiateSocketConnection(token, () => {
        navigate("/chat");
      });
    }
  }, [token, navigate]);

  // Function to handle token submission
  const submitToken = (e) => {
    e.preventDefault();
    // Get token value from the input and update the state
    const tokenValue = tokenInputRef.current.value;
    setToken(tokenValue);
  };

  // Render the Join component
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Sign-In</h1>
        <div>
          {/* Input field for entering the token */}
          <input
            placeholder="Enter token"
            className="joinInput"
            ref={tokenInputRef}
            type="text"
          />
        </div>
        {/* Button to submit the token */}
        <button className={"button mt-20"} type="submit" onClick={submitToken}>
          {" "}
          Sign In
        </button>
      </div>
    </div>
  );
}
