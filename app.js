/*
 * @Author: Null
 * @Date: 2021-11-06 16:22:59
 * @Description: 测试用
 */
const http = require('http')
const path = require('path')
const parser = require('ua-parser-js')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const server = http.createServer((req, res) => {
  console.log('path.join方法测试', path.join('/foo', 'bar', 'baz/asdf'))
  console.log('path.join方法封装为resolve方法测试', resolve('src'))

  console.log('path.resolve()方法测试1', path.resolve('/foo', '/bar', 'baz'))
  console.log('path.resolve()方法测试2', path.resolve('/foo/bar', './baz'))

  var ua = parser(req.headers['user-agent'])

  console.log(
    'path.resolve("wwwroot", "static_files/png/", "../gif/image.gif")',
    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
  )
  // 如果当前工作目录为 /home/myself/node，
  // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'

  // res.end('Hellow , World !!')
  // write the result as response
  res.end(JSON.stringify(ua, null, '  '))
})

const PORT = 5000

server.listen(PORT, () => {
  console.log(`listening at port 5000, please visit http://localhost:${PORT}`)
})
