import React from "react";

import "./ChatHeader.css";

const ChatHeader = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <span className="onlineIcon"></span>
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <span className="closeIcon">&times;</span>
      </a>
    </div>
  </div>
);

export default ChatHeader;
