const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const rn = require('random-number');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors');

// Middleware between both server
app.options('*',cors());

// method for creating random integer
const options = {
    min:  350
    , max:  5000
    , integer: true
};
// make connection with Front-end Server and send Co2 value every 10 seconds
io.on('connection', socket => {
    //console.log('User connected');
    setInterval(function(){
        const  n = rn(options);
        if (n === false) {
            socket.emit("FromAPI", 100);
        }
        socket.emit("FromAPI", n);
    }, 10000);
});
server.listen(port, () => console.log(`Listening on port ${port}`));