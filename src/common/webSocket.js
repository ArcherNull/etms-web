/*
 * @Author: Null
 * @Date: 2021-12-27 13:54:53
 * @Description: webSocket方法封装
 */

const wsBaseUrl = 'ws://localhost:8002'

var ws = new WebSocket(wsBaseUrl)

// 实例对象的onopen属性，用于指定连接成功后的回调函数。
ws.onopen = function (event) {
  console.log('Connection open ...')
  ws.send('Hello WebSockets!')
}
// 实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
ws.onmessage = function (evt) {
  console.log('Received Message: ' + evt.data)
  ws.close()
}

// 实例对象的onclose属性，用于指定连接关闭后的回调函数。
ws.onclose = function (evt) {
  var code = event.code
  var reason = event.reason
  var wasClean = event.wasClean
  console.log('Connection closed.')
  console.log('code', code)
  console.log('reason', reason)
  console.log('wasClean', wasClean)
}
// 实例对象的onerror属性，用于指定报错时的回调函数。
ws.onerror = function (event) {
  // handle error event
}

export default ws
