import mongoose from 'mongoose'

const { Schema } = mongoose
export const cardSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  description: {
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
  repeatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  iteration: {
    type: Number,
    default: 0,
  },
  deckIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Deck',
    },
  ],
})

// export default mongoose.model('Card', cardSchema)
