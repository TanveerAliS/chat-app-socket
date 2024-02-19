import React from "react";
import "./Input.css";

// Input component for typing and sending messages
const Input = ({ setMessage, handleSendMessage, message }) => (
  // Form for typing and sending messages
  <form className="form">
    {/* Input field for typing messages */}
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      // Update the message state on input changes
      onChange={({ target: { value } }) => setMessage(value)}
      // Send message on pressing the Enter key
      onKeyPress={(event) =>
        event.key === "Enter" ? handleSendMessage(event) : null
      }
    />
    {/* Button to send the typed message */}
    <button className="sendButton" onClick={(e) => handleSendMessage(e)}>
      Send
    </button>
  </form>
);

// Export the Input component as the default export
export default Input;
