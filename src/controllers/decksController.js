import createError from 'http-errors'

export default async function decksController(fastify) {
  const { deck, collection } = fastify.db.services

  // List decks
  fastify.get('/', async (request) => {
    const decks = await deck.get({
      collectionId: request.params.collectionId,
      userId: request.user.sub,
    })

    if (!decks) {
      throw createError(404, 'No decks found')
    }

    return decks
  })

  // Add deck
  fastify.post('/new', async (request, reply) => {
    const { collectionId } = request.params
    const userId = request.user.sub

    const parentCollection = await collection.get({
      _id: collectionId,
      userId,
    })

    if (!parentCollection) {
      throw createError(404, 'Collection not found')
    }

    const newDeck = await deck.create({
      ...request.body,
      collectionId,
      userId,
    })

    return reply.code(201).send(newDeck)
  })

  // Show one deck
  // fastify.get('/:id', async (request, reply) => {
  //   const desiredDeck = await deck.get({
  //     _id: request.params.id,
  //     userId: request.user.sub,
  //   })
  //
  //   if (!desiredDeck) {
  //     throw createError.NotFound('Deck not found')
  //   }
  //   return desiredDeck
  // })

  // Update deck
  fastify.put('/:id', async (request) => {
    const desiredDeck = await deck.update(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
      request.body,
    )

    if (!desiredDeck) {
      throw createError(404, 'Deck not found')
    }
    return desiredDeck
  })

  // Delete deck
  fastify.delete('/:id', async (request, reply) => {
    const originalDeck = await deck.remove({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!originalDeck) {
      throw createError(404, 'Deck not found')
    }
    return originalDeck
  })
}
