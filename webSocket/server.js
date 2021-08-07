const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

//create webSocket server, listern on 3000 port
const wsServer = new WebSocketServer({ port: 3001 });

wsServer.on("close", () => {
    console.log("Disconnected");
});

wsServer.on("connection", function connection(ws, req) {

    const ip = req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const clientName = ip + port;

    console.log("%s is connected", clientName);

    //send
    ws.send("welcome" + clientName);
    ws.on("message", (msg) => {
        console.log("received: %s from %s", msg, clientName);

        //broadcast
        wsServer.clients.forEach(client => {
            if(client.readyState == WebSocket.OPEN)
            {
                client.send(clientName + " -> " + msg);
            }
        });
    });
});

// //Client connect to server
// wss.on("connection", (ws) => {

//     //     var i=0
//     //     var int = setInterval(function f() {
//     //     ws.send(i++) // 每隔 1 秒给连接方报一次数
//     //   }, 1000)

//     ws.on("message", msg => {
//         ws.send(msg, (err) => {
//             console.log(`[SERVER] error: ${err}`);
//         });
//     });
// });