export default async function decksController(fastify) {
  // Implement list decks
  fastify.get('/')

  // Implement add deck
  fastify.post('/new')

  // Implement list one deck
  fastify.get('/:id')

  // Implement edit deck
  fastify.put('/:id')

  // Implement delete deck
  fastify.delete('/:id')
}
