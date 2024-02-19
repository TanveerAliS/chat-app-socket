import { useEffect } from "react";
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToChat,
} from "./api/socketio";

function App() {
  useEffect(() => {
    initiateSocketConnection();
    subscribeToChat((err, data) => {
      console.log(data);
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <>
      <p>Chat App</p>
    </>
  );
}

export default App;
