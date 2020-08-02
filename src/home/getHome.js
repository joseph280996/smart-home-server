import Home from '../models/Home'

export const getHome = async (uuid) => {
  try {
    return await Home.findOne({
      uuid,
    }).populate('zones')
  } catch (err) {
    throw new Error(err)
  }
}

export const getUserPopulatedHome = async (uuid) => {
  try {
    return await Home.findOne({ uuid }).populate('user')
  } catch (err) {
    throw new Error(err)
  }
}
