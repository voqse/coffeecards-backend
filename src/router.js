import cardsController from './controllers/cardsController.js'
import decksController from './controllers/decksController.js'
import collectionsController from './controllers/collectionsController.js'

export default async function router(fastify) {
  fastify.register(cardsController, { prefix: '/cards' })
  fastify.register(decksController, { prefix: '/decks' })
  fastify.register(collectionsController, { prefix: '/collections' })
}
