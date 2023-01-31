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
  // List cards
  fastify.get('/', async (request, reply) => {
    const filter = { userId: request.user.sub }
    const { collection, deck } = request.query

    if (deck) {
      filter.deckIds = deck
    } else if (collection) {
      filter.collectionId = collection
    }
    // const cards = await fastify.db.getCards(filter)
    const cards = ['hello']

    if (!cards || cards.length === 0) {
      throw new createError.NotFound('No cards found')
    }

    return cards
  })

  // Add card
  fastify.post('/new', async (request, reply) => {
    // const deck = await fastify.db.getDecks(request.body.deckIds)
    const deck = ['deck']

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
    }).populate({
      path: 'deckIds',
      populate: { path: 'collectionId' },
    })

    if (!card) {
      throw new createError.NotFound('Card not found')
    }
    return card
  })

  // Edit card
  fastify.put('/:id', async (request, reply) => {
    const card = Card.findOneAndUpdate(
      {
        _id: request.params.id,
        userId: request.user.sub,
      },
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
