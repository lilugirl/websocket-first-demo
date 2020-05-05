const WebSocket = require('ws')



// 多聊天室功能
// roomid->对应相同的roomid进行广播消息
let group = {}
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
      ws.roomid = msgObj.roomid
      if (typeof group[ws.roomid] === 'undefined') {
        group[ws.roomid] = 1;
      } else {
        group[ws.roomid]++;
      }


    }

    // console.log(msg)

    //主动发送到客户端
    //ws.send("Server:" + msg)


    //广播消息
    wss.clients.forEach((client) => {


      if (client.readyState === WebSocket.OPEN && client.roomid === ws.roomid) {
        msgObj.name = ws.name
        // msgObj.num = wss.clients.size;
        msgObj.num = group[ws.roomid];
        msgObj.roomid = ws.roomid
        client.send(JSON.stringify(msgObj))
      }

    })
  })

  //当ws客户端断开连接时
  ws.on('close', function () {
    if (ws.name) {
      group[ws.roomid]--;
    }

    let msgObj = {}
    //广播消息
    wss.clients.forEach((client) => {

      if (client.readyState === WebSocket.OPEN && ws.roomid === client.roomid) {
        msgObj.name = ws.name;
        msgObj.num = group[ws.roomid];
        msgObj.event = "out";
        client.send(JSON.stringify(msgObj))
      }
    })
  })


})