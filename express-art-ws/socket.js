const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: 8000
});

wss.on('connection', function (ws) {
    console.log('[WEBSOCKET] connection success');
    ws.on('message', function (message, flags) {
        console.log(`[WEBSOCKET] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[WEBSOCKET] error: ${err}`);
            }
        });
    })
})