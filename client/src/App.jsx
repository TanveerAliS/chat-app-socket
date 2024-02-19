import { useEffect } from "react";
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToChat,
} from "./api/socketio";
import Chat from "./pages/Chat";
import Join from "./pages/Join";
import Protected from "./components/ProtectedRoutes";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route
          path="/chat"
          element={
            <Protected>
              <Chat />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
