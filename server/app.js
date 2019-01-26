const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const servers = {}
const players = {}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    let server = null

    socket.on('connect to server', (msg) => {
        console.log(`New server from ${socket} for ${msg}`)
        if (servers[msg]) {
            servers[msg].push(socket)
        } else {
            servers[msg] = [socket]
        }
        server = msg
        if (players[msg]) {
            players[msg].forEach(a => {
                console.log('SENDING ' + JSON.stringify({
                    myid: a,
                    x: 597,
                    y: 2699,
                    pid: a
                }))
                socket.emit('data', JSON.stringify({
                    myid: a,
                    x: 597,
                    y: 2699,
                    pid: a
                }))
            })
        }
    });
    socket.on('data', msg => {
        console.log(`new message ${msg}`)
        const parsed = JSON.parse(msg)
        if (parsed.id === 'myid') {
            if (players[server]) {
                players[server].push(parsed.value)
            } else {
                players[server] = [parsed.value]
            }
        }
        servers[server].forEach(a => {
            if (a !== socket) {
                console.log('SENDING ' + msg)
                a.emit('data', msg)
            }
        })
    })
    socket.on('disconnect', (reason) => {
        console.log(`${socket} disconnected ${reason}`);
        if (servers[server]) {
            servers[server] = servers[server].filter(a => a !== socket)
        }
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});