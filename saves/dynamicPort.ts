import 'dotenv/config'
import express, { type Application } from 'express'

const app = express()
const port = 2

app.get('/', (_req, res) => {
  res.send(port)
})

function findAvailablePort(server: Application, port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      resolve(port)
    }).on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port: ${port} -> is already in use`)
        console.log(`Trying with port: ${port + 1}`)
        resolve(findAvailablePort(server, port + 1))
      }

      reject(error)
    })
  })
}

findAvailablePort(app, port).then((port) => {
  console.log('Server is running on ' + port)
}).catch((error) => {
  console.log('Error: ', error)
})
