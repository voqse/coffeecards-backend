import fp from 'fastify-plugin'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

async function authPlugin(fastify, options = {}) {
  const { secret, ...jwtOpts } = options

  if (!secret) {
    return new Error('You must define a secret')
  }

  fastify.decorateRequest('user', null)

  fastify.addHook('onRequest', async (request, reply) => {
    const { authorization } = request.headers

    if (!authorization) {
      throw new createError.Unauthorized()
    }

    const parts = authorization.split(' ')
    if (parts.length !== 2) {
      throw new createError.Unauthorized()
    }

    const scheme = parts[0]
    const token = parts[1]
    if (!/^Bearer$/i.test(scheme)) {
      throw new createError.Unauthorized()
    }

    try {
      request.user = await jwt.verify(token, secret, jwtOpts) //?

      // TODO: check if sub is valid mongoose.ObjectId
    } catch (error) {
      fastify.log.error(error)
      throw new createError.Unauthorized()
    }
  })
}

export default fp(authPlugin)
