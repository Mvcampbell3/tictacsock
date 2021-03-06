module.exports = function(io) {
  io.on('connection', function(socket) {

    console.log('connected');

    socket.on('hello', () => {
      socket.emit('room list', socket.adapter.rooms)
    })

    socket.on('join room', (data) => {
      console.log('-----------join room -------------------')
      console.log(data);
      socket.join(`player-${data.room}`);
      socket.emit('room created', { room: data.room, players: socket.adapter.rooms[`player-${data.room}`].length })
      io.emit('room list', socket.adapter.rooms)
      console.log('-----------join room -------------------')
    })

    socket.on('leave room', (data) => {
      console.log('-----------leave room -------------------')
      console.log(data);
      const rightRoom = socket.adapter.rooms[`player-${data.room}`];

      socket.leave(`player-${data.room}`)
      if (rightRoom) {
        io.to(`player-${data.room}`).emit('room check back', rightRoom.length)
      }

      io.emit('room list', socket.adapter.rooms)
      console.log('-----------leave room -------------------')

    })

    socket.on('room check', (room) => {
      console.log('-------------------room check---------------------')
      console.log(room)
      const rightRoom = socket.adapter.rooms[`player-${room}`];
      console.log(rightRoom);
      console.log(rightRoom.sockets);

      io.to(`player-${room}`).emit('room check back', { players: rightRoom.length, playerArray: Object.keys(rightRoom.sockets) })
      console.log('-------------------room check----------------------')
    })

    socket.on('disconnect', function() {
      console.log('disconnected');
      io.emit('room list', socket.adapter.rooms)
    })

  })
}