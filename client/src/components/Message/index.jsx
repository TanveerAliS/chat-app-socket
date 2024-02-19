import React from "react";

import "./Message.css";
const Message = ({ message: { message, name, id }, currentUser }) => {
  let isSentByCurrentUser = false;
  console.log({ message, name, currentUser, id });

  const trimmedName = currentUser.name.trim().toLowerCase();
  console.log({ message, name, currentUser }, trimmedName);
  if (name.trim().toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <span className="sentText">{currentUser.name}</span>
        <p className="messageText colorWhite">{message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <span className="sentText">{name}</span>
        <p className="messageText colorDark">{message}</p>
      </div>
    </div>
  );
};

const MemoizedMessage = React.memo(Message);
export default MemoizedMessage;
