import { io } from 'socket.io-client'

let socket

// Function to initiate a socket connection with token authentication
export const initiateSocketConnection = (token, redirect) => {
    // Connect to the specified socket endpoint with token and WebSocket transport
    socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
        auth: {
            token
        },
        transports: ["websocket"]
    })

    // Event listener for successful socket connection
    socket.on("connect", () => {
        // Save the token in localStorage upon successful connection
        localStorage.setItem('token', socket.auth.token)
        // Redirect to the specified location after successful connection
        redirect()
    })

    console.log(`Connecting socket...`)
}

// Function to disconnect the socket
export const disconnectSocket = () => {
    console.log('Disconnecting socket...')
    // Disconnect the socket if it exists
    if (socket) socket.disconnect()
}

// Function to subscribe to a global chat
export const subscribeToChat = (cb) => {
    // Emit a test message to the server upon subscription
    socket.emit('my message', 'Hello there from React.')
    // Return true if socket does not exist
    if (!socket) return true
    // Event listener for receiving global chat messages
    socket.on('my broadcast', msg => {
        console.log('Websocket event received!')
        // Call the provided callback with the received message
        return cb(null, msg)
    })
}

// Function to subscribe to room-specific messages
export const subscribeToMessages = (cb) => {
    // Return true if socket does not exist
    if (!socket) return true
    // Event listener for receiving room-specific messages
    socket.on('message', msg => {
        console.log('Room event received!')
        // Call the provided callback with the received message
        return cb(null, msg)
    })
}

// Function to send a message to a specific room
export const sendMessage = ({ message, roomName }, cb) => {
    // Send a message to the specified room if the socket exists
    if (socket) socket.emit('message', { message, roomName }, cb)
}

// Function to fetch user details from the server based on the token
export const getUserDetails = (token) => {
    return fetch(`${process.env.REACT_APP_SOCKET_ENDPOINT}/getUserDetails?token=${token}`)
        .then(response => response.json())
        .then(user => {
            return user
        })
        .catch(error => {
            console.error("Error fetching user details:", error)
        })
}
