let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, rest) => {
  res.sendFile('index.html');
})

users = [];

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('setUserName', (data) => {
    if(users.indexOf(data) > -1) {
      users.push(data);
      socket.emit('userSet', {username: data});
    } else {
      socket.emit('userExists', `${data} is taken!, Try some other user name.`);
    }
  })
})

http.listen(3000, () => {
  console.log('listening on localhost:3000');
})
