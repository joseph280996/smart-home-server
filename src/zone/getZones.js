import Zone from '../models/Zone'

export const getZoneByIds = async (idsArr) => {
  try {
    return await Zone.find({
      _id: {
        $in: idsArr,
      },
    })
  } catch (err) {
    throw new Error(err)
  }
}

export const getZone = async (zoneName) => {
  try {
    return await Zone.findOne({ name: zoneName })
  } catch (err) {
    throw new Error(err)
  }
}

export const getZoneById = async (zoneId) => {
  try {
    return await Zone.findById(zoneId).populate('user').exec()
  } catch (err) {
    throw new Error(err)
  }
}
