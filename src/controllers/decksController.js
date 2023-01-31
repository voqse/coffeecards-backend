import createError from 'http-errors'

export default async function decksController(fastify) {
  const messages = {
    notFound: 'Deck not found',
  }
  const { deck, collection } = fastify.db

  // List decks
  fastify.get('/', async (request, reply) => {
    const filter = {
      collectionId: request.query?.collection,
      userId: request.user.sub,
    }
    const decks = await deck.get(filter)

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

    return reply.code(201).send(newDeck.save())
  })

  // Show one deck
  fastify.get('/:id', async (request, reply) => {
    const parentDeck = await deck.get(request.params.id)

    if (!parentDeck) {
      throw new createError.NotFound('Deck not found')
    }
    return parentDeck
  })

  // Edit card
  fastify.put('/:id', async (request, reply) => {
    const originalDeck = await deck.update(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
      request.body,
    )

    if (!originalDeck) {
      throw new createError.NotFound('Deck not found')
    }
    return originalDeck
  })

  // Delete card
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
