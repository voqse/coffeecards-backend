import mongoose from 'mongoose'

const { Schema } = mongoose
const deckSchema = new Schema({
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
  collection: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
  },
})

export default mongoose.model('Deck', deckSchema)