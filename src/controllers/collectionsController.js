import createError from 'http-errors'

export async function checkOwnership(service, message) {}

export default async function collectionsController(fastify) {
  const { collection } = fastify.db.services

  // List collections
  fastify.get('/', async (request, reply) => {
    const collections = await collection.get({
      userId: request.user.sub,
    })

    if (!collections) {
      throw new createError.NotFound('No collections found')
    }

    return collections
  })

  // Add collection
  fastify.post('/new', async (request, reply) => {
    const newCollection = await collection.create({
      ...request.body,
      userId: request.user.sub,
    })

    return reply.code(201).send(newCollection)
  })

  // Show one collection
  fastify.get('/:id', async (request, reply) => {
    const desiredCollection = await collection.get({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!desiredCollection) {
      throw new createError.NotFound('Collection not found')
    }
    return desiredCollection
  })

  // Update collection
  fastify.put('/:id', async (request, reply) => {
    const desiredCollection = await collection.update(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
      request.body,
    )

    if (!desiredCollection) {
      throw new createError.NotFound('Collection not found')
    }
    return desiredCollection
  })

  // Delete collection
  fastify.delete('/:id', async (request, reply) => {
    const originalCollection = await collection.remove({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!originalCollection) {
      throw new createError.NotFound('Collection not found')
    }
    return originalCollection
  })
}
