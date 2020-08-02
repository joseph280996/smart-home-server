import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import WebSocket from 'ws'

import createUser from './user/createUser'
import DBConfig from './db'
import { wsOnConnection } from './ws'
import { getZonePopulatedUserByUUID } from './user'
import { homeHandler } from './home'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(helmet())

// Setting up Mongo database
mongoose
  .connect(DBConfig.MONGO_URL, DBConfig.MONGODB_OPTIONS)
  // eslint-disable-next-line no-console
  .then(() => console.log('DB connected'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error('ERR', err.message))

// User Register Device Route
app.post('/home', homeHandler)

app.post('/user', createUser)
app.get('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await getZonePopulatedUserByUUID(id)
  res.status(200).send(user)
})
app.get('/*', (req, res) => {
  res.status(404).send('Not Found')
})
app.post('/*', (req, res) => {
  res.status(404).send('Not Found')
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// Websocket
wss.on('connection', wsOnConnection(wss))

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${port}`)
  // eslint-disable-next-line no-console
  console.log(`🚀 Websocket ready at ws://localhost:${port}`)
})

process.on('SIGINT', () => {
  wss.clients.forEach((ws) => {
    ws.close()
  })
})
