import mongoose from 'mongoose'

const { Schema } = mongoose
export const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
})

// export default mongoose.model('Collection', collectionSchema)
