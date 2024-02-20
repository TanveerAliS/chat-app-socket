## Real-Time Chat Application

This repository contains the code for a real-time chat application built using React Hooks, Socket.IO, WebSockets, ExpressJS, and NodeJS.

### Features

- **Real-Time Communication:** Utilizes WebSockets and Socket.IO for real-time communication between the server and clients.

- **User Authentication:** Implements user authentication using tokens (JWT). Only authenticated users can connect to the chat application.

### Getting Started

1. Clone the repository:

   ```bash
   git clone git@github.com:TanveerAliS/chat-app-socket.git
   ```

2. Install dependencies: Go to both server and client directory and install dependancy

   ```bash
   cd server
   npm install
   ```

   ```bash
   cd client
   npm install
   ```

3. Start the server and client in respective directory

   ```bash
   node index.js
   ```

   ```bash
   npm run dev
   ```

4. Open the app in your browser:

   [http://localhost:3000](http://localhost:3000) - server

   [http://localhost:5173](http://localhost:5173) - client

### Authentication

To ensure secure communication, users need to authenticate using a token (JWT). Enter the token in the input field at join page.

### Token Input and Authentication

To handle token authentication, the application calls the `initiateSocketConnection` function upon submitting the token input. The token is set in the state variable and becomes a dependency in the `useEffect` hook, ensuring that the hook is called whenever the token changes. An if statement prevents issues with an initially undefined token.

The `initiateSocketConnection` function in the `socketio.js` file handles the token parameter and passes it in the `auth` property during socket initialization.

#### Token Generation

Generate a random token on [jwt.io](https://jwt.io/), including an 'id' parameter and signing it with the 'chat-app-hash' secret. Copy the encoded token from the left box and paste it into the input box provided in the application.

### Handling Token Authentication in NodeJS

To validate and parse the JWT in NodeJS, install the 'jsonwebtoken' module in your project. The backend middleware verifies the JWT token, extracts user data, and throws an error if the token is invalid or expired. User information is stored in the socket object for easy extraction in future events.

Now that authentication and user information are ready, create a simple UI for chat messages and an input box.
