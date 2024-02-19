import React from "react";

import "./Message.css";

// Message component
const Message = ({ message: { message, name, id }, currentUser }) => {
  // Variable to track whether the message is sent by the current user
  let isSentByCurrentUser = false;
  // Trim and convert the current user's name to lowercase for comparison
  const trimmedName = currentUser.name.trim().toLowerCase();

  // Check if the message is sent by the current user
  if (name.trim().toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  }

  // Render different styles based on whether the message is sent by the current user
  return isSentByCurrentUser ? (
    // Container for messages sent by the current user
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        {/* Display the current user's name */}
        <span className="sentText">{currentUser.name}</span>
        {/* Display the message text */}
        <p className="messageText colorWhite">{message}</p>
      </div>
    </div>
  ) : (
    // Container for messages sent by other users
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        {/* Display the sender's name */}
        <span className="sentText">{name}</span>
        {/* Display the message text */}
        <p className="messageText colorDark">{message}</p>
      </div>
    </div>
  );
};

// MemoizedMessage component created using React.memo for performance optimization
const MemoizedMessage = React.memo(Message);
// Export the MemoizedMessage component as the default export
export default MemoizedMessage;
