import fp from 'fastify-plugin'

async function authPlugin(fastify, opts) {
  fastify.decorate('auth', function (request, reply) {})
  // fastify.decorateRequest()
}

export default fp(authPlugin)
