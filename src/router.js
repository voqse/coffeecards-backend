import cardsController from './controllers/cardsController.js'
import decksController from './controllers/decksController.js'
import collectionsController from './controllers/collectionsController.js'

// TODO: Figure out how to implement nested routes
export default async function router(fastify) {
  // /cards?collection=COLLECTION_SLUG
  // /cards?collection=COLLECTION_SLUG&practice=true
  // /cards?deck=DECK_SLUG
  fastify.register(cardsController, { prefix: '/cards' })
  // /decks?collection=COLLECTION_SLUG
  fastify.register(decksController, { prefix: '/decks' })
  fastify.register(collectionsController, { prefix: '/collections' })
}
