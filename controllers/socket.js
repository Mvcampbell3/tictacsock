module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connected');

    socket.on('hello', (msg) => {
      console.log(msg)
      socket.emit('room list', socket.adapter.rooms)
    })

    socket.on('join room', (data) => {
      console.log(data);
      socket.join(`player-${data.room}`);
      io.emit('room list', socket.adapter.rooms)
    })

    socket.on('disconnect', function() {
      console.log('disconnected');
      io.emit('room list', socket.adapter.rooms)
    })

  })
}