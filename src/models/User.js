import mongoose from 'mongoose'

const { Schema } = mongoose

const UserModel = new Schema(
  {
    uuid: String,
    firstName: String,
    lastName: String,
    email: { type: String, index: true },
    home: { type: Schema.ObjectId, ref: 'Home' },
  },
  { timestamps: true },
)

export default mongoose.model('User', UserModel)
