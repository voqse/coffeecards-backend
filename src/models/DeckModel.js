import mongoose from 'mongoose'

const { Schema } = mongoose
export const deckSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    required: true,
  },
})

// export default mongoose.model('Deck', deckSchema)
