const express = require('express');
const {createServer} = require('http');
const io = require('socket.io');
const user = require('./user')

const app = express();
const server = createServer(app);
const userIds = {};
const empt = () => {};

app.use('/', express.static(`${process.cwd()}/..client`))


/*
 * Random ID until the ID is not in use 
 */
function reandomID(callback) {
    const id = user();
    id in userIds ? setTimeout(() => user(callback), 5) : callback(id); 
}

/*
 * Send data to friend
 */
function sendTo(to, done, fail) {
    const receiver = userIds[to];
    if(receiver) {
        const next = typeof done === 'function' ? done : empt;
        next(receiver);
    }
    else {
        const next = typeof fail === 'function' ? fail : empt;
        next();
    }
}

/*
 * Initialize when connection is made
 * @param {SocketIO.socket} socket
 */
function initSocket(socket) {
    let id;
    socket.on('init', () => {
        randomID( _id => {
           id = _id;
            userIds[id] = socket;
            socket.emit('init', {id})
        })
    })
        .on('request', data => {
            sendTo(data.to, to => to.emit('request', {from: id}))
        })
        .on ('call', data => {
            sendTo(
                data.to,
                to => to.emit('call', {...data, from : id}),
                () => socket.emit('failed')
            )
        })
        .on('end', data => {
            sendTo(data.to, to => to.emit('end'))
        })
        .on('disconnect', () => {
            delete userIds[id];
            console.log(id, 'disconnected');
        })

    return socket;
}

module.export.run = config => {
    server.listen(config.PORT);
    console.log(`Server is listening at :${config.PORT}`)
    io.listen(server, {log:true})
        .on('connection', initSocket);
}
