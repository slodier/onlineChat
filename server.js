var express = require('express');
var app = express();
var routes = require('./js/server/route')(app);

app.use(express.static(__dirname));

app.listen(5000);

// Websocket
const WebSocket = require('ws');
const ws = new WebSocket.Server({
    port:5050
});

var clients = [];   // 连接池

// Event
ws.on('connection', function (ws, req) {
    clients.push(ws);
    ws.on('message', function incoming(msg) {
        console.log(msg);
        // 广播消息
        clients.forEach(function (ws1) {
            if (ws1 != ws)
                ws1.send(msg);
        })
    });

    ws.on('close', function (message) {
        // 连接关闭将其移出连接池
        clients = clients.filter(function (ws1) {
            return ws1 != ws;
        })
    })

});