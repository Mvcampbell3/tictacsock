module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connected');

    socket.on('hello', () => {
      socket.emit('room list', socket.adapter.rooms)
    })

    socket.on('join room', (data) => {
      console.log(data);
      socket.join(`player-${data.room}`);
      socket.emit('room created', data.room)
      io.emit('room list', socket.adapter.rooms)
    })

    socket.on('leave room', (data) => {
      console.log(data);
      socket.leave(`player-${data.room}`)
      
      io.emit('room list', socket.adapter.rooms)
    })

    socket.on('room check', (room) => {
      console.log('--------------------------------------------------')
      console.log(room)
      console.log(socket.adapter.rooms)
      const rightRoom = socket.adapter.rooms[`player-${room}`];
      console.log(rightRoom);
      io.to(`player-${room}`).emit('room check back', rightRoom.length)
      console.log('------------------------------------------------------')
    })

    socket.on('disconnect', function() {
      console.log('disconnected');
      io.emit('room list', socket.adapter.rooms)
    })

  })
}