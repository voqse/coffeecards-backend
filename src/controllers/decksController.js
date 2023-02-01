import createError from 'http-errors'

export default async function decksController(fastify) {
  const { deck, collection } = fastify.db.services

  // List decks
  fastify.get('/', async (request, reply) => {
    const decks = await deck.get({
      collectionId: request.query?.collection,
      userId: request.user.sub,
    })

    if (!decks || decks.length === 0) {
      throw new createError.NotFound('No decks found')
    }

    return decks
  })

  // Add deck
  fastify.post('/new', async (request, reply) => {
    const parentCollection = await collection.get(request.body.collectionId)

    if (!parentCollection) {
      throw new createError.BadRequest('Provided collection does not exist')
    }
    const newDeck = await deck.create({
      ...request.body,
      userId: request.user.sub,
    })

    return reply.code(201).send(newDeck)
  })

  // Show one deck
  fastify.get('/:id', async (request, reply) => {
    const desiredDeck = await deck.get({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!desiredDeck) {
      throw new createError.NotFound('Deck not found')
    }
    return desiredDeck
  })

  // Update deck
  fastify.put('/:id', async (request, reply) => {
    const desiredDeck = await deck.update(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
      request.body,
    )

    if (!desiredDeck) {
      throw new createError.NotFound('Deck not found')
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
      throw new createError.NotFound('Deck not found')
    }
    return originalDeck
  })
}
