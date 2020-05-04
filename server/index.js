const WebSocket = require('ws')

const wss = new WebSocket.Server({
  port: 3000
})

wss.on('connection', function connection(ws) {
  console.log('one client is connected')

  // 接收客户端的消息
  ws.on('message', function (msg) {
    // console.log(msg)

    //主动发送到客户端
    //ws.send("Server:" + msg)


    //广播消息
    wss.clients.forEach((client) => {

      // 判断非自己的客户端才发送
      if (ws !== client && client.readyState === WebSocket.OPEN) {
        client.send('Server:' + msg)
      }

    })
  })

  // 主动发送消息给客户端
  ws.send('Message from server')
})