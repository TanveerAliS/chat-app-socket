// Import required modules
const app = require('express')()
const http = require('http').createServer(app)
const jwt = require('jsonwebtoken')
const cors = require('cors')

// JWT secret - The provided token is used solely for the purpose of illustrating for this app. In a real-world scenario, it is expected that your application would already possess a valid token.
const JWT_SECRET = 'chat-app-hash'

// Setup Socket.IO with CORS configuration
const io = require("socket.io")(http, {
    cors: {
        origins: [
            "*"  // Allowing all as application can take any port for testing and deployment in heroku 
        ],
        credentials: true
    },
})

// Enable Cross-Origin Resource Sharing (CORS) for the Express app
app.use(cors())

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Chat app - server')
})

// Expose an endpoint to return user details based on the provided token
app.get('/getUserDetails', async (req, res) => {
    const token = req.query.token
    try {
        const user = await jwt.verify(token, JWT_SECRET)
        console.log("server", user)
        res.json(user)
    } catch (e) {
        res.status(401).json({ error: 'Invalid token' })
    }
})

// Middleware for Socket.IO to handle token authentication
io.use(async (socket, next) => {
    // Fetch token from handshake auth sent by the frontend
    const token = socket.handshake.auth.token
    try {
        // Verify JWT token and get user data
        const user = await jwt.verify(token, JWT_SECRET)
        console.log('user', user)
        // Save the user data into the socket object, to be used further
        socket.user = user
        next()
    } catch (e) {
        // If token is invalid, close connection
        console.log('error', e.message)
        return next(new Error(e.message))
    }
})

// Handle socket connections
io.on('connection', (socket) => {
    // Join user's own room and a random chat room
    socket.join(socket.user.id)
    socket.join('myMeetingId')

    // Log user connection
    console.log('⚡️ A user connected')

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('🔥 User disconnected')
    })

    // Broadcasting event when a message is received
    socket.on('my message', (msg) => {
        io.emit('Broadcast Msg:', `server: ${msg}`)
    })

    // Handle joining a room
    socket.on('join', (roomName) => {
        socket.join(roomName)
    })

    // Handle sending messages in a specific room
    socket.on('message', ({ message, roomName }, callback) => {
        console.log('message: ' + message + ' in ' + roomName)

        // Generate data to send to receivers
        const outgoingMessage = {
            name: socket.user.name,
            id: socket.user.id,
            message,
        }

        // Send socket to all in room except sender
        socket.to(roomName).emit("message", outgoingMessage)

        // Callback to acknowledge message receipt
        callback({
            status: "ok"
        })
    })
})

// Start the server on port 3000
http.listen(3000, () => {
    console.log('Listening on *:3000')
})
