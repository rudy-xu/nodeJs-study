const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:3001')

//send
ws.on("open", msg => {
    ws.send("hello");
});

// accpet
ws.on('message', (message) => {
    console.log(message);
})