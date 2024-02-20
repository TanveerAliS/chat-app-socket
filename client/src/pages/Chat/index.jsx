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

// Constant for the chat room identifier
const CHAT_ROOM = "myMeetingId";

// Chat component
const Chat = () => {
  // State variables for the current user, message input, and chat messages
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Retrieve token from local storage or default to an empty string
  const token = localStorage.getItem("token") || "";
  // React Router's useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Effect hook to handle component lifecycle and socket events
  useEffect(() => {
    // Check if a valid token exists, otherwise navigate to the login page
    if (!token) navigate("/");

    // If token exists, subscribe to incoming chat messages and get user details
    if (token) {
      // Subscribe to messages and update the messages state
      subscribeToMessages((err, data) => {
        setMessages((prev) => [...prev, data]);
      });

      // Get user details based on the token and update the currentUser state
      getUserDetails(token).then((data) => {
        setCurrentUser(data);
      });
    }
  }, [token, navigate]);

  // Function to handle sending a new chat message
  const handleSendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // Send the message to the server and update the local messages state
      sendMessage({ message, roomName: CHAT_ROOM }, (cb) => {
        setMessages((prev) => [
          ...prev,
          {
            message,
            ...currentUser,
          },
        ]);
        // Clear the input after the message is sent
        setMessage("");
      });
    }
  };

  // Render the Chat component
  return (
    <div className="outerContainer">
      <div className="container">
        {/* ChatHeader component */}
        <ChatHeader />
        {/* Messages component */}
        <Messages messages={messages} currentUser={currentUser} />
        {/* Input component for typing and sending messages */}
        <Input
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

// Export the Chat component as the default export
export default Chat;
