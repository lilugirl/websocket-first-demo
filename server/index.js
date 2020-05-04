const WebSocket = require('ws')

const wss = new WebSocket.Server({
  port: 3000
})

wss.on('connection', function connection(ws) {
  console.log('one client is connected')

  // 接收客户端的消息
  ws.on('message', function (msg) {
    console.log(msg)
  })

  // 主动发送消息给客户端
  ws.send('Message from server')
})