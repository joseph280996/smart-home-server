import mongoose from 'mongoose'

const { Schema } = mongoose

const ZoneModel = new Schema(
  {
    uuid: String,
    user: { type: Schema.ObjectId, ref: 'User' },
    name: { type: String, index: true },
    data: [{ temperature: String, humidity: String }],
  },
  { timestamps: true },
)

export default mongoose.model('Zone', ZoneModel)
