const app = require('express')()
const http = require('http').createServer(app)
const jwt = require('jsonwebtoken')
const cors = require('cors')
// jwt secret
const JWT_SECRET = 'chat-app-hash'

const io = require("socket.io")(http, {
    cors: {
        origins: [
            "http://localhost:5175"
        ],
        credentials: true
    },
})
app.use(cors())
app.get('/', (req, res) => {
    res.send('Chat app - server')
})

// Expose an endpoint to return user details
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

io.use(async (socket, next) => {
    // fetch token from handshake auth sent by FE
    const token = socket.handshake.auth.token
    try {
        // verify jwt token and get user data
        const user = await jwt.verify(token, JWT_SECRET)
        console.log('user', user)
        // save the user data into socket object, to be used further
        socket.user = user
        next()
    } catch (e) {
        // if token is invalid, close connection
        console.log('error', e.message)
        return next(new Error(e.message))
    }
})

io.on('connection', (socket) => {
    // join user's own room
    socket.join(socket.user.id)
    socket.join('myRandomChatRoomId')

    console.log('⚡️ A user connected')

    //Disconnection
    socket.on('disconnect', () => {
        console.log('🔥 user disconnected')
    })

    //Broadcasting Event
    socket.on('my message', (msg) => {
        io.emit('Broadcast Msg:', `server: ${msg}`)
    })

    socket.on('join', (roomName) => {
        console.log('join: ' + roomName)
        socket.join(roomName)
    })

    socket.on('message', ({ message, roomName }, callback) => {
        console.log('message: ' + message + ' in ' + roomName)

        // generate data to send to receivers
        const outgoingMessage = {
            name: socket.user.name,
            id: socket.user.id,
            message,
        }
        // send socket to all in room except sender
        socket.to(roomName).emit("message", outgoingMessage)
        callback({
            status: "ok"
        })
        // send to all including sender
        // io.to(roomName).emit('message', message);
    })

})

http.listen(3000, () => {
    console.log('listening on *:3000')
})