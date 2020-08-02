import { v4 as uuidv4 } from 'uuid'
import Zone from '../models/Zone'
import { getZone } from './getZones'

const createZone = async (zoneName) => {
  try {
    let zone = await getZone(zoneName)
    if (!zone) {
      zone = new Zone({
        uuid: uuidv4(),
        name: zoneName,
      })
      await zone.save()
    }
    return zone
  } catch (err) {
    throw new Error(err)
  }
}
export default createZone
