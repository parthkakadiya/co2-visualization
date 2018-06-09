const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const rn = require('random-number');

const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, '../client/src');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors');

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
// for cross domain connection
const allowCrossDomain = function(req,res,next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS,GET,PUT,POST,DELETE,HEAD');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Access-Control-Allow-Headers, Accept-Control-Request-*, Origin,Accept, X-Requested-With, Content-Type, Content-Range, Content-Disposition, Content-Description, If-Modified-Since, Access-Control-Request-Method, Access-Control-Request-Headers, api-key');
    next();
};
app.use(allowCrossDomain);

app.get('/api', (req, res) => {
    res.send({ express: publicPath });
});
server.listen(port, () => console.log(`Listening on port ${port}`));