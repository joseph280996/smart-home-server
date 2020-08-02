import mongoose from 'mongoose'

const { Schema } = mongoose

const HomeModel = new Schema(
  {
    uuid: { type: String, index: true },
    zones: [{ type: Schema.ObjectId, ref: 'Zone' }],
    ip: Number,
    user: { type: Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

export default mongoose.model('Home', HomeModel)
