const express   = require('express');
const io        = require('socket.io');
const app       = express();
const server    = require('http').createServer(app);

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
})
