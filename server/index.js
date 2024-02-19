const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:5173']
    }
})

app.get('/', (req, res) => {
    res.send('Chat app - server')
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