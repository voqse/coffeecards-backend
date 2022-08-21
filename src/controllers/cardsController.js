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
  const { Card } = fastify.mongoose.models

  // List cards
  fastify.get('/', async (request, reply) => {
    const { sub: userId } = request.user
    const filter = { userId }
    const { collection: collectionId, deck: deckIds } = request.query

    if (deckIds) {
      filter.deckIds = deckIds
    } else if (collectionId) {
      filter.collectionId = collectionId
    }

    return Card.find(filter)
  })

  // Add card
  fastify.post('/new', async (request, reply) => {
    const { sub: userId } = request.user
    const { deckIds } = request.body
    const newCard = new Card(request.body)

    return reply.code(201).send(await newCard.save())
  })

  // Show one card
  fastify.get('/:id', async (request, reply) => {
    const { sub: userId } = request.user

    return Card.findOne({ id: request.params.id, userId })
  })

  // Edit card
  fastify.put('/:id', async (request, reply) => {
    const { sub: userId } = request.user

    return Card.findOneAndUpdate(
      { id: request.params.id, userId },
      request.body,
    )
  })

  // Delete card
  fastify.delete('/:id', async (request, reply) => {
    const { sub: userId } = request.user

    return Card.findOneAndRemove({ id: request.params.id, userId })
  })
}
