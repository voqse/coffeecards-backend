import mongoose from 'mongoose'
import { cardSchema } from '../schemas/cardSchema.js'
import { deckSchema } from '../schemas/deckSchema.js'
import { collectionSchema } from '../schemas/collectionSchema.js'

export default function createMongoProvider(options) {
  const { uri, ...mongoOpts } = options || {}

  if (!uri) {
    return new Error('You must define a URI')
  }

  let connection

  function get() {
    return connection
  }

  function connect() {
    connection = mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...mongoOpts,
    })

    const Card = connection.model('Card', cardSchema)
    const Deck = connection.model('Deck', deckSchema)
    const Collection = connection.model('Collection', collectionSchema)
  }

  function close() {
    return connection.close()
  }

  return {
    get,
    connect,
    close,
  }
}
