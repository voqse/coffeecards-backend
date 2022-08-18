export default async function collectionsController(fastify) {
  // Implement list collections
  fastify.get('/', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement add collection
  fastify.post('/new', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement list one collection
  fastify.get('/:id', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement edit collection
  fastify.put('/:id', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })

  // Implement delete collection
  fastify.delete('/:id', async (request, reply) => {
    return reply.send({ it: 'Works' })
  })
}
