import React from "react";

import "./Message.css";
const Message = ({ message: { message, name, id } }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  console.log({ message, name, id });
  // if (user === trimmedName) {
  //   isSentByCurrentUser = true
  // }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message}</p>
      </div>
      <p className="sentText pl-10 ">{name}</p>
    </div>
  );
};

export default Message;
