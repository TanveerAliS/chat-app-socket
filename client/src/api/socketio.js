
import { io } from 'socket.io-client'

let socket

export const initiateSocketConnection = (token, redirect) => {
    socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
        auth: {
            token
        },
        transports: ["websocket"]
    })
    socket.on("connect", () => {
        localStorage.setItem('token', socket.auth.token)
        redirect()
    })
    console.log(`Connecting socket...`)
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...')
    if (socket) socket.disconnect()
}

export const subscribeToChat = (cb) => {
    socket.emit('my message', 'Hello there from React.')

    socket.on('my broadcast', msg => {
        return cb(null, msg)
    })
}