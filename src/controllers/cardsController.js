export default async function cardsController(fastify) {
  // Implement list cards
  fastify.get('/')

  // Implement add card
  fastify.post('/new')

  // Implement list one card
  fastify.get('/:id')

  // Implement edit card
  fastify.put('/:id')

  // Implement delete card
  fastify.delete('/:id')
}
