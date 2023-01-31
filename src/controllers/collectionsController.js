import createError from 'http-errors'

export default async function collectionsController(fastify) {
  const { Collection } = fastify.db.models

  // List collections
  fastify.get('/', async (request, reply) => {
    const filter = { userId: request.user.sub }
    const collections = Collection.find()

    if (!collections || collections.length === 0) {
      throw new createError.NotFound('No collections found')
    }

    return collections
  })

  // Add collection
  fastify.post('/new', async (request, reply) => {
    const collection = new Collection({
      ...request.body,
      userId: request.user.sub,
    })

    return reply.code(201).send(collection.save())
  })

  // Show one collection
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

  // Edit collection
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

  // Delete collection
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
