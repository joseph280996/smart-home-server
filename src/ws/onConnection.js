import url from 'url'
import { getHomePopulatedUserByUUID } from '../user'
import { getHome } from '../home'
import wsOnMessage from './onMessage'

export default (wss) => async (ws, req) => {
  const { query } = url.parse(req.url, { parseQueryString: true })
  // Create or get zone if it's the device connection
  // Set id for ws connection.
  if (query.home) {
    const home = await getHome(`${query.home}`)
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    ws.id = home.uuid
  } else {
    // No zone provide indicate frontend
    // Get user and assign id to ws connection.
    const user = await getHomePopulatedUserByUUID(query.uuid)
    if (user) {
      // eslint-disable-next-line no-param-reassign
      ws.id = user.uuid
    }
  }

  ws.on('message', wsOnMessage(wss, ws))
}
