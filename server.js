const { createServer } = require('http')
const next = require('next')

const hostname = 'localhost'
const port = 3000

const app = next({ hostname, port })

app.prepare().then(() => {
  createServer(async (req, res) => {}).listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running at：http://${hostname}:${port}`)
  })
})
