import createError from 'http-errors'

export default async function collectionsController(fastify) {
  const { Collection } = fastify.mongoose.models

  // List cards
  fastify.get('/', async (request, reply) => {
    const filter = { userId: request.user.sub }
    const collections = Deck.find(filter)

    if (!collections || decks.length === 0) {
      throw new createError.NotFound('No collections found')
    }

    return collections
  })

  // Add card
  fastify.post('/new', async (request, reply) => {
    const collection = new Collection({
      ...request.body,
      userId: request.user.sub,
    })

    return reply.code(201).send(collection.save())
  })

  // Show one card
  fastify.get('/:id', async (request, reply) => {
    const collection = await Collection.findOne({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!collection) {
      throw new createError.NotFound('Collection not found')
    }
    return collection
  })

  // Edit card
  fastify.put('/:id', async (request, reply) => {
    const collection = Collection.findOneAndUpdate(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
      request.body,
      { new: true },
    )

    if (!collection) {
      throw new createError.NotFound('Collection not found')
    }
    return collection
  })

  // Delete card
  fastify.delete('/:id', async (request, reply) => {
    const collection = Collection.findOneAndDelete({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!collection) {
      throw new createError.NotFound('Collection not found')
    }
    return collection
  })
}
