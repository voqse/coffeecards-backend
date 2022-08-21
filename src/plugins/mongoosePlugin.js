import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import { cardSchema } from '../models/CardModel.js'
import { deckSchema } from '../models/DeckModel.js'
import { collectionSchema } from '../models/CollectionModel.js'

async function mongoosePlugin(fastify, options = {}) {
  const { uri, ...mongooseOpts } = options

  if (!uri) {
    return new Error('You must define a uri')
  }

  const connection = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ...mongooseOpts,
  })

  fastify.addHook('onClose', async (instance) => {
    await connection.close()
  })

  connection.model('Card', cardSchema)
  connection.model('Deck', deckSchema)
  connection.model('Collection', collectionSchema)

  fastify.decorate('mongoose', connection)
}

export default fp(mongoosePlugin)
