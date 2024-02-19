// Importing components for different pages
import Chat from "./pages/Chat";
import Join from "./pages/Join";

// Importing necessary components from react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Main App component
function App() {
  return (
    // BrowserRouter provides the routing context for the app
    <BrowserRouter>
      {/* Routes component defines the routes for different pages */}
      <Routes>
        {/* Route for the Join page, element prop renders the Join component */}
        <Route path="/" element={<Join />} />
        {/* Route for the Chat page, element prop renders the Chat component */}
        <Route path="/chat" element={<Chat />} />
        {/* Default route, if none of the above matches, redirect to the Join page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// Exporting the App component as the default export
export default App;
