import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "../../components/ChatHeader";
import Input from "../../components/Input";
import Messages from "../../components/Messages";
const Chat = ({}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    // handle message send
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <ChatHeader />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
