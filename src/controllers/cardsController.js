import createError from 'http-errors'

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
  const { Card, Deck } = fastify.mongoose.models

  // List cards
  fastify.get('/', async (request, reply) => {
    const filter = { userId: request.user.sub }
    const { collection: collectionId, deck: deckIds } = request.query

    if (deckIds) {
      filter.deckIds = deckIds
    } else if (collectionId) {
      filter.collectionId = collectionId
    }
    const cards = Card.find(filter)

    if (!cards || cards.length === 0) {
      throw new createError.NotFound('No cards found')
    }

    return cards
  })

  // Add card
  fastify.post('/new', async (request, reply) => {
    const deck = await Deck.findOne({ deckIds: request.body.deckIds })

    if (!deck) {
      throw new createError.BadRequest('Provided deck does not exist')
    }
    const card = new Card({ ...request.body, userId: request.user.sub })

    return reply.code(201).send(card.save())
  })

  // Show one card
  fastify.get('/:id', async (request, reply) => {
    const card = await Card.findOne({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!card) {
      throw new createError.NotFound('Card not found')
    }
    return card
  })

  // Edit card
  fastify.put('/:id', async (request, reply) => {
    const card = Card.findOneAndUpdate(
      { _id: request.params.id, userId: request.user.sub },
      request.body,
      { new: true },
    )

    if (!card) {
      throw new createError.NotFound('Card not found')
    }
    return card
  })

  // Delete card
  fastify.delete('/:id', async (request, reply) => {
    const card = Card.findOneAndDelete({
      _id: request.params.id,
      userId: request.user.sub,
    })

    if (!card) {
      throw new createError.NotFound('Card not found')
    }
    return card
  })
}
