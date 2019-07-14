import { Server as WSServer } from 'ws';

const wss = new WSServer({
  port: 8000,
});

wss.on('connection', function(ws) {
  console.log('[WEBSOCKET] connection success');
  ws.on('message', function(message) {
    console.log(`[WEBSOCKET] Received: ${message}`);
    ws.send(`ECHO: ${message}`, err => {
      if (err) {
        console.log(`[WEBSOCKET] error: ${err}`);
      }
    });
  });
});
