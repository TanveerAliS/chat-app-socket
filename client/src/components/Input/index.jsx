import React from "react";
import "./Input.css";

const Input = ({ setMessage, handleSendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? handleSendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(e) => handleSendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
