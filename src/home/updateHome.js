import Home from '../models/Home'

export default async (user, homeIds) => {
  try {
    const updatedZones = await Home.updateMany(
      {
        _id: {
          $in: homeIds,
        },
      },
      { user },
    )
    return updatedZones
  } catch (err) {
    throw new Error(err)
  }
}
