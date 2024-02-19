import React from "react";
import Message from "../Message";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";

// Messages component
const Messages = ({ messages, currentUser }) => (
  // ScrollToBottom component for automatic scrolling to the bottom of the container
  <ScrollToBottom className="messages">
    {/* Map through messages array and render each Message component */}
    {messages.map((message, i) => (
      <div key={i}>
        {/* Message component for displaying individual messages */}
        <Message message={message} currentUser={currentUser} />
      </div>
    ))}
  </ScrollToBottom>
);

// Export the Messages component as the default export
export default Messages;
