import React from "react";

import "./ChatHeader.css";

const ChatHeader = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <span className="onlineIcon"></span>
      <h3>Meeting chat</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
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

export default ChatHeader;
