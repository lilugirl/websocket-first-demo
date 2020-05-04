const WebSocket = require('ws')
const ws = new WebSocket('ws://127.0.0.1:3000')

ws.on('open', function () {
  console.log('client is connected to Server');

  ws.send('client say hell to server!!!')
  ws.on('message', function (msg) {
    console.log(msg)
  })
})