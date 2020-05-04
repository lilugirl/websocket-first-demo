const WebSocket = require('ws')
const ws = new WebSocket('ws://127.0.0.1:3000')

ws.on('open', function () {
  console.log('client is connected to Server');
})