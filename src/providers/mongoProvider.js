import mongoose from 'mongoose'
import { cardSchema } from '../schemas/cardSchema.js'
import { deckSchema } from '../schemas/deckSchema.js'
import { collectionSchema } from '../schemas/collectionSchema.js'
import { isObject } from '../utils.js'

export function createMongoService(Model) {
  function get(filter) {
    return isObject(filter) ? Model.find(filter) : Model.findById(filter)
  }

  function create(item) {
    const newItem = new Model(item)
    return newItem.save()
  }

  function update(filter, item) {
    return isObject(filter)
      ? Model.findOneAndUpdate(filter, item)
      : Model.findByIdAndUpdate(filter, item)
  }

  function remove(filter) {
    return isObject(filter)
      ? Model.findOneAndRemove(filter)
      : Model.findByIdAndRemove(filter)
  }

  return {
    get,
    create,
    update,
    remove,
  }
}

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
      card: createMongoService(connection.model('Card', cardSchema)),
      deck: createMongoService(connection.model('Deck', deckSchema)),
      collection: createMongoService(
        connection.model('Collection', collectionSchema),
      ),
    }
  }

  function close() {
    return connection.close()
  }

  function get() {
    return services
  }

  return {
    connect,
    close,
    get,
  }
}
