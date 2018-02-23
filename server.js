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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

let connections = []
let users = []
let messages = []

io.on('connection', function(socket){
    connections.push(socket);
    console.log(`${socket.id} connected: ${connections.length} active connections.`)

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket),1);
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == socket.id){
                users.splice(i, 1);
                break;
            }
        }
        console.log(`Connection disconnected: ${connections.length} active connections.`)
        io.sockets.emit('update users', {users: users});
        if (!connections.length){
            messages=[];
        }          
    })

    socket.on('send message', function(data) {
        let ts = new Date()
        data.timestamp = `${ts.getHours()}:${ts.getMinutes()}`;
        messages.push(data)
        io.sockets.emit('message', messages)
    })
    socket.on('login', function (name, team) {
        console.log(name, team);
        users.push({
            name: name,
            team: team,
            id: socket.id
        })
        socket.emit('logged in', {loggedIn: true, currentUser: name, history: messages})
        io.sockets.emit('update users', {users: users})
        socket.emit('update users', {users: users})
    })

    socket.on('reveal', function(data) {
        io.sockets.emit('revealed', {id: data})
    })
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
