const express = require('express');
const app = express();
const server = require('http').Server(app);
const PORT = process.env.PORT || 3001;
const io = require('socket.io')(server);

require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./controllers/socket')(io);

server.listen(PORT, () => {
  console.log(`server is live on http://localhost:${PORT}`)
})