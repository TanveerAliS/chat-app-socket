import React from "react";
import Message from "../Message";

import "./Messages.css";

const Messages = ({ messages, currentUser }) => (
  <div className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} currentUser={currentUser} />
      </div>
    ))}
  </div>
);

export default Messages;
