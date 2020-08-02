import { getUserPopulatedHome } from '../home'

export default (wss, ws) => async (message) => {
  const sensorRegex = /sensor:/i
  const populatedZone = await getUserPopulatedHome(ws.id)
  if (sensorRegex.test(message)) {
    const sensorData = JSON.parse(message.replace(sensorRegex, ''))
    // eslint-disable-next-line no-console
    console.log(sensorData)
    const clients = []
    wss.clients.forEach((client) => {
      if (populatedZone && populatedZone.user && client.id === populatedZone.user.uuid) clients.push(client)
    })
    // eslint-disable-next-line no-console
    clients.forEach((client) => {
      client.send(JSON.stringify(sensorData))
    })

    // eslint-disable-next-line no-console
  }
}
