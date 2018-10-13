var ws = new WebSocket('ws://localhost:8000/test');

ws.onmessage = function (msg) {
    console.log(msg);
}
ws.onopen = function () {
    ws.send('Hello!');
}