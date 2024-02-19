const app = require('express')()
const http = require('http').createServer(app)
const jwt = require('jsonwebtoken')

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

app.get('/', (req, res) => {
    res.send('Chat app - server')
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
    console.log('⚡️ A user connected ')

    //Disconnection
    socket.on('disconnect', () => {
        console.log('🔥 user disconnected')
    })

    //Broadcasting Event
    socket.on('my message', (msg) => {
        io.emit('Broadcast Msg:', `server: ${msg}`)
    })

})

http.listen(3000, () => {
    console.log('listening on *:3000')
})