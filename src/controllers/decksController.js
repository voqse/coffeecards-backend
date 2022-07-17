export default async function decksController(fastify) {
  // Implement list decks
  fastify.get('/', async (request, reply) => {
    reply.send({ it: 'Works' })
  })

  // Implement add deck
  fastify.post('/new', async (request, reply) => {
    reply.send({ it: 'Works' })
  })

  // Implement list one deck
  fastify.get('/:id', async (request, reply) => {
    reply.send({ it: 'Works' })
  })

  // Implement edit deck
  fastify.put('/:id', async (request, reply) => {
    reply.send({ it: 'Works' })
  })

  // Implement delete deck
  fastify.delete('/:id', async (request, reply) => {
    reply.send({ it: 'Works' })
  })
}
