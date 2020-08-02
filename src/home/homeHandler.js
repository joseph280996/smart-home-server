import createHome from './createHome'
import { createZone } from '../zone'

export default async (req, res) => {
  const ip = req.ip.split(':')
  const { zones, uuid } = req.body
  const newZones = await Promise.all(
    zones.map(async (zone) => {
      const newZone = await createZone(zone.name)
      // eslint-disable-next-line no-underscore-dangle
      return newZone
    }),
  )
  const newHome = await createHome(ip[ip.length - 1], uuid, newZones)
  res.status(200).json({ home: newHome })
}
