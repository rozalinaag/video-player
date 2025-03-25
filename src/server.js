import {Server} from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {cors: {origin: '*'}})

io.on('connection', (socket) => {
    console.log("Client connected")

    setInterval(() => {
        socket.emit("message", `New update at ${new Date().toLocaleTimeString()}`)
    }, 2000)

    socket.on('disconnect', () => console.log("Client disconnected"))
})

server.listen(3001, () => console.log("WebSocket server started port 3001"))
