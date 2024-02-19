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
    socket.on('disconnect', () => {
        console.log('🔥 user disconnected')
    })
})


http.listen(3000, () => {
    console.log('listening on *:3000')
})