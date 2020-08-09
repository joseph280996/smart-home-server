import { getUserPopulatedHome } from '../home'
import { getHomePopulatedUserByUUID } from '../user/getUser'

const sendData = async (id, message, regex, wss, isUser) => {
  let populatedData
  if (isUser) populatedData = await getHomePopulatedUserByUUID(id)
  else populatedData = await getUserPopulatedHome(id)
  const data = JSON.parse(message.replace(regex, ''))
  // eslint-disable-next-line no-console
  console.log(data)
  const clients = []
  if (isUser) {
    wss.clients.forEach((client) => {
      if (populatedData && populatedData.home && client.id === populatedData.home.uuid) clients.push(client)
    })
  } else
    wss.clients.forEach((client) => {
      if (populatedData && populatedData.user && client.id === populatedData.user.uuid) clients.push(client)
    })
  // eslint-disable-next-line no-console
  clients.forEach((client) => {
    console.log(`Sending:${JSON.stringify(data)}`)
    client.send(JSON.stringify(data))
  })
}

export default (wss, ws) => async (message) => {
  const sensorRegex = /sensor:/i
  const setTempRegex = /temperature:/i
  if (sensorRegex.test(message)) {
    await sendData(ws.id, message, sensorRegex, wss, false)
  }
  if (setTempRegex.test(message)) {
    await sendData(ws.id, message, setTempRegex, wss, true)
  }
}
