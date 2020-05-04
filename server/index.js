const WebSocket = require('ws')

var num = 0;

const wss = new WebSocket.Server({
  port: 3000
})

wss.on('connection', function connection(ws) {
  console.log('one client is connected')

  // 接收客户端的消息
  ws.on('message', function (msg) {
    const msgObj = JSON.parse(msg)
    if (msgObj.event === 'enter') {
      ws.name = msgObj.message
      num++

    }

    // console.log(msg)

    //主动发送到客户端
    //ws.send("Server:" + msg)


    //广播消息
    wss.clients.forEach((client) => {


      if (client.readyState === WebSocket.OPEN) {
        msgObj.name = ws.name
        // msgObj.num = wss.clients.size;
        msgObj.num = num;
        client.send(JSON.stringify(msgObj))
      }

    })
  })

  //当ws客户端断开连接时
  ws.on('close', function () {
    if (ws.name) {
      num--;
    }

    let msgObj = {}
    //广播消息
    wss.clients.forEach((client) => {

      if (client.readyState === WebSocket.OPEN) {
        msgObj.name = ws.name;
        msgObj.num = num;
        msgObj.event = "out";
        client.send(JSON.stringify(msgObj))
      }
    })
  })


})