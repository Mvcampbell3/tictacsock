module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('connected');

    socket.on('hello', (msg) => {
      console.log(msg)
      socket.emit('test')
    })

    socket.on('disconnect', function() {
      console.log('disconnected')
    })
  })
}