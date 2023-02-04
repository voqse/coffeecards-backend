import createError from 'http-errors'

// TODO: Add data validation and serialization
const cardItem = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    definition: {
      type: 'string',
    },
    deckIds: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  required: ['title', 'definition', 'deckIds'],
}

const cardSchema = {
  body: cardItem,
  response: {
    '2xx': cardItem,
  },
}

// const registerOpts = { schema: loginSchema }
// const loginOpts = { schema: loginSchema }

export default async function cardsController(fastify) {
  const { card, deck } = fastify.db.services

  // List cards
  fastify.get('/', async (request, reply) => {
    const cards = await card.get({
      deckIds: [request.params.deckId],
      userId: request.user.sub,
    })

    if (!cards) {
      throw new createError.NotFound('No cards found')
    }

    return cards
  })

  // Add card
  fastify.post('/new', async (request, reply) => {
    const { deckId } = request.params
    const userId = request.user.sub

    const parentDeck = await deck.get({
      _id: deckId,
      userId,
    })

    if (!parentDeck) {
      throw new createError.BadRequest('Deck not found')
    }

    const newCard = await card.create({
      ...request.body,
      deckIds: [deckId],
      userId,
    })

    return reply.code(201).send(newCard)
  })

  // Show one card
  fastify.get('/:id', async (request, reply) => {
    const desiredCard = await card.get({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!desiredCard) {
      throw new createError.NotFound('Card not found')
    }
    return desiredCard
  })

  // Update deck
  fastify.put('/:id', async (request, reply) => {
    const desiredCard = await card.update(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
      request.body,
    )

    if (!desiredCard) {
      throw new createError.NotFound('Card not found')
    }
    return desiredCard
  })

  // Delete deck
  fastify.delete('/:id', async (request, reply) => {
    const originalCard = await card.remove({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!originalCard) {
      throw new createError.NotFound('Card not found')
    }
    return originalCard
  })
}
