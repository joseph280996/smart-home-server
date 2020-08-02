import Home from '../models/Home'
import { getHome } from './getHome'
import { IPToNumber } from '../utils/IPAddressUtils'

const createHome = async (ipv4, uuid, zones) => {
  try {
    let home = await getHome(uuid)
    if (!home) {
      home = new Home({
        ip: IPToNumber(ipv4),
        uuid,
        zones,
      })
      await home.save()
    }
    return home
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    throw new Error(err)
  }
}
export default createHome
