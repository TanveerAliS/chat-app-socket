import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "../../components/ChatHeader";

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
      </div>
    </div>
  );
};

export default Chat;
