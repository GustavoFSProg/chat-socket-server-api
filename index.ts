import {Request, Response} from 'express'
const app = require('express')()
const server = require('http').createServer(app)
// const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } })
const io = require('socket.io')(server, { cors: { origin: 'https://web-chat-my.netlify.app/' } })



const PORT = 3001

io.on('connection', (socket: any) => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', (reason: any) => {
    console.log('Usuário desconectado!', socket.id)
  })

  socket.on('set_username', (username: any) => {
    socket.data.username = username
  })

  socket.on('message', (text: any) => {
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username
    })
  })
})

app.get('/', (req: Request, res: Response) =>
{ return res.send(` ⛩️ - 🔣 - Api Running on Sites`) })

server.listen(PORT, () => console.log('Server running...'))
