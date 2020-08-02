import User from '../models/User'

export const getUserByUUID = async (uuid) => {
  try {
    const user = await User.findOne({ uuid })
    if (!user) {
      return {}
    }
    return user
  } catch (err) {
    throw new Error(err)
  }
}

export const getHomePopulatedUserByUUID = async (uuid) => {
  try {
    const user = await User.findOne({ uuid }).populate('home')
    if (!user) {
      return {}
    }
    return user
  } catch (err) {
    throw new Error(err)
  }
}

export const getZonePopulatedUserByUUID = async (uuid) => {
  try {
    const user = await User.findOne({ uuid }).populate('home').populate('zones')
    if (!user || !user.home || !user.home.zones) {
      return {}
    }
    return user
  } catch (err) {
    throw new Error(err)
  }
}

export const getUserById = async (uuid) => {
  try {
    const user = await User.findById(uuid)
    if (!user) throw new Error('User Not Found')
    return user
  } catch (err) {
    throw new Error(err)
  }
}

export const getUserByEmail = async (email) => {
  try {
    const user = User.findOne({ email })
    if (!user) throw new Error('User Not Found')
    return user
  } catch (err) {
    throw new Error(err)
  }
}
