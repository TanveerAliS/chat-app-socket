import React from "react";
import "./ChatHeader.css";

// ChatHeader component for displaying chat information and actions
const ChatHeader = ({ room }) => (
  <div className="infoBar">
    {/* Left section of the header */}
    <div className="leftInnerContainer">
      {/* Online icon (if applicable) */}
      <span className="onlineIcon"></span>
      {/* Heading for the chat room or meeting */}
      <h3>Meeting chat</h3>
    </div>
    {/* Right section of the header */}
    <div className="rightInnerContainer">
      {/* Link to navigate back to the home page */}
      <a href="/">
        {/* Close icon to log out and remove the token from local storage */}
        <span
          onClick={() => localStorage.removeItem("token")}
          className="closeIcon"
        >
          &times;
        </span>
      </a>
    </div>
  </div>
);

// Export the ChatHeader component as the default export
export default ChatHeader;
