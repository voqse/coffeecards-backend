export default async function collectionsController(fastify) {
  // Implement list collections
  fastify.get('/')

  // Implement add collection
  fastify.post('/new')

  // Implement list one collection
  fastify.get('/:id')

  // Implement edit collection
  fastify.put('/:id')

  // Implement delete collection
  fastify.delete('/:id')
}
