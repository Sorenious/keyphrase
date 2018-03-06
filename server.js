const express = require("express");
const http = require('http');
const socket_io = require('socket.io')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const server = http.createServer(app)
const io = socket_io(server)
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gameboard",
  {
    useMongoClient: true
  }
);

var state = {};

// let connections = []
// let users = []
// let messages = []

// {
//     "room`1234" : {
//         connection: [],
//         users: [],
//         messages:[]
//     }
// }

io.on('connection', function(socket){
    console.log(socket.handshake['query']['r_var']);
    var room = socket.handshake['query']['r_var'];

    socket.join(room);

    if (!state[room]) {
        state[room] = {
        connections: [],
        users: [],
        messages:[]
        }
    }

    state[room].connections.push(socket);
    console.log(`${socket.id} connected: ${state[room].connections.length} active connections.`)
    // state[room].users.pu

    console.log('user joined room #'+room);

    socket.on('disconnect', function(data){
        state[room].connections.splice(state[room].connections.indexOf(socket),1);
        for (var i = 0; i < state[room].users.length; i++) {
            if (state[room].users[i].id == socket.id){
                state[room].users.splice(i, 1);
                break;
            }
        }
        console.log(`Connection disconnected: ${state[room].connections.length} active connections.`)
        io.sockets.to(room).emit('update users', {users: state[room].users});
        if (!state[room].connections.length){
            state[room].messages=[];
            state[room] = undefined;
        socket.leave(room)
        }          
    })

    socket.on('send message', function(data) {
        let ts = new Date()
        data.timestamp = `${ts.getHours()}:${ts.getMinutes()}`;
        state[room].messages.push(data)
        io.sockets.to(room).emit('message', state[room].messages)
    })
    socket.on('login', function (name, team) {
        console.log(name, team);
        state[room].users.push({
            name: name,
            team: team,
            id: socket.id
        })
        socket.emit('logged in', {loggedIn: true, currentUser: name, history: state[room].messages})
        io.sockets.to(room).emit('update users', {users: state[room].users})
        socket.emit('update users', {users: state[room].users})
    })

    socket.on('reveal', function(data) {
        io.sockets.to(room).emit('revealed', {id: data})
    })

    socket.on('update', function(data) {
        io.sockets.to(room).emit('newGame', {id: data})
    })
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
