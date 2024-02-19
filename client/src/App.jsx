import { useEffect } from "react";
import { initiateSocketConnection, disconnectSocket } from "./api/socketio";

function App() {
  useEffect(() => {
    initiateSocketConnection();
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
