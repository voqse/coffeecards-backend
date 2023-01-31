import createError from 'http-errors'

export default async function decksController(fastify) {
  const { Deck, Collection } = fastify.db.models

  // List cards
  fastify.get('/', async (request, reply) => {
    const filter = { userId: request.user.sub }
    const { collection } = request.query

    if (collection) {
      filter.collectionId = collection
    }
    const decks = Deck.find(filter)

    if (!decks || decks.length === 0) {
      throw new createError.NotFound('No decks found')
    }

    return decks
  })

  // Add card
  fastify.post('/new', async (request, reply) => {
    const collection = await Collection.findOne({
      collectionId: request.body.collectionId,
    })

    if (!collection) {
      throw new createError.BadRequest('Provided collection does not exist')
    }
    const deck = new Deck({ ...request.body, userId: request.user.sub })

    return reply.code(201).send(deck.save())
  })

  // Show one card
  fastify.get('/:id', async (request, reply) => {
    const deck = await Deck.findOne({
      _id: request.params.id,
      userId: request.user.sub,
    }).populate({
      path: 'collectionId',
    })

    if (!deck) {
      throw new createError.NotFound('Deck not found')
    }
    return deck
  })

  // Edit card
  fastify.put('/:id', async (request, reply) => {
    const deck = Deck.findOneAndUpdate(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
      request.body,
      { new: true },
    )

    if (!deck) {
      throw new createError.NotFound('Deck not found')
    }
    return deck
  })

  // Delete card
  fastify.delete('/:id', async (request, reply) => {
    const deck = Deck.findOneAndDelete({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!deck) {
      throw new createError.NotFound('Deck not found')
    }
    return deck
  })
}
