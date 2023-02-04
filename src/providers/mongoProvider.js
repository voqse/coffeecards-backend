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
      ? Model.findOneAndUpdate(filter, item, { new: true })
      : Model.findByIdAndUpdate(filter, item, { new: true })
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
    throw new Error('You must provide a URI')
  }

  const services = {}
  let connection

  async function connect() {
    /** @type {ConnectOptions} */
    const mongoOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...opts,
    }

    connection = await mongoose.createConnection(uri, mongoOpts).asPromise()

    services.card = createMongoService(connection.model('Card', cardSchema))
    services.deck = createMongoService(connection.model('Deck', deckSchema))
    services.collection = createMongoService(
      connection.model('Collection', collectionSchema),
    )
    return self
  }

  async function close() {
    await connection.close()
    return self
  }

  const self = {
    connect,
    close,
    services,
  }
  return self
}
