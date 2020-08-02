import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../models'
import updateHome from '../home/updateHome'

dotenv.config()

export default async (req, res) => {
  const { firebaseUID, email, firstName, lastName, home } = req.body
  const homeObjID = home.map((id) => mongoose.Types.ObjectId(id))
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      uuid: firebaseUID,
      home: homeObjID,
    })
    await updateHome(newUser, homeObjID)
    const savedUser = await newUser.save()
    res.status(200).json({
      user: savedUser,
    })
  } catch (err) {
    throw new Error(err)
  }
}
