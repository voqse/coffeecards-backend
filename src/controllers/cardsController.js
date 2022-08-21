export default async function cardsController(fastify) {
  const { Card } = fastify.mongoose.models

  // List cards
  fastify.get('/', async (request, reply) => {
    return Card.find()
  })

  // Add card
  fastify.post('/new', async (request, reply) => {
    const newCard = new Card(request.body)

    return newCard.save()
  })

  // Show one card
  fastify.get('/:id', async (request, reply) => {
    return Card.findOne({ id: request.params.id })
  })

  // Edit card
  fastify.put('/:id', async (request, reply) => {
    return Card.findOneAndUpdate({ id: request.params.id }, request.body)
  })

  // Delete card
  fastify.delete('/:id', async (request, reply) => {
    return Card.findOneAndRemove({ id: request.params.id })
  })
}
