import { getZone } from './getZones'

export default async (zoneData) => {
  const { name, ...dataObject } = zoneData
  try {
    const zone = await getZone(name)
    if (!zone) {
      throw new Error('Zone Not Exist')
    }
    zone.data.push(dataObject)
    zone.save()
  } catch (err) {
    throw new Error(err)
  }
}
