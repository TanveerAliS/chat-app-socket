import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "../../components/ChatHeader";
import Input from "../../components/Input";
import Messages from "../../components/Messages";
import {
  sendMessage,
  subscribeToMessages,
  disconnectSocket,
  getUserDetails,
} from "../../api/socketio";
import { useNavigate } from "react-router-dom";

const CHAT_ROOM = "myRandomChatRoomId";

const Chat = ({}) => {
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/");
    if (token) {
      subscribeToMessages((err, data) => {
        setMessages((prev) => [...prev, data]);
      });
      getUserDetails(token).then((data) => {
        setCurrentUser(data);
      });
      return () => {
        disconnectSocket();
        localStorage.getItem("");
      };
    }
  }, [token]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // const message = inputRef.current.value
      sendMessage({ message, roomName: CHAT_ROOM }, (cb) => {
        // callback is acknowledgement from server
        console.log("handleSendMessage", message);
        setMessages((prev) => [
          ...prev,
          {
            message,
            ...currentUser,
          },
        ]);
        // clear the input after the message is sent
        setMessage("");
      });
    }
  };
  console.log({ messages });
  return (
    <div className="outerContainer">
      <div className="container">
        <ChatHeader />
        <Messages messages={messages} currentUser={currentUser} />
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
