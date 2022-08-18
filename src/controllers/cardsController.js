export default async function cardsController(fastify) {
  // Implement list cards
  fastify.get('/', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement add card
  fastify.post('/new', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement list one card
  fastify.get('/:id', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement edit card
  fastify.put('/:id', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement delete card
  fastify.delete('/:id', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })
}
