import mongoose from 'mongoose'
import { cardSchema } from '../schemas/cardSchema.js'
import { deckSchema } from '../schemas/deckSchema.js'
import { collectionSchema } from '../schemas/collectionSchema.js'
import createService from '../services/genericService.js'

export default function createMongoProvider(options) {
  const { uri, ...opts } = options || {}

  if (!uri) {
    return new Error('You must provide a URI')
  }

  let services
  let connection

  function connect() {
    /** @type {ConnectOptions} */
    const mongoOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...opts,
    }

    connection = mongoose.createConnection(uri, mongoOpts)
    services = {
      card: createService(connection.model('Card', cardSchema)),
      deck: createService(connection.model('Deck', deckSchema)),
      collection: createService(
        connection.model('Collection', collectionSchema),
      ),
    }
  }

  function close() {
    return connection.close()
  }

  function getInstance() {
    return services
  }

  return {
    connect,
    close,
    getInstance,
  }
}
