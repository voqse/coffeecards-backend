import fp from 'fastify-plugin'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

async function authPlugin(fastify, options) {
  const { secret = 'you-must-define-a-secret' } = options

  // fastify.decorate('auth', function (request, reply) {
  //   const { authorization } = request.headers
  //
  //   if (!authorization) {
  //     return reply.send(new createError.Unauthorized('No authorization header'))
  //   }
  // })

  fastify.addHook('onRequest', async (request, reply) => {
    const { authorization } = request.headers

    if (!authorization) {
      throw new createError.Unauthorized()
    }

    const parts = authorization.split(' ')
    if (parts.length !== 2) {
      throw new createError.BadRequestError()
    }

    const scheme = parts[0]
    const token = parts[1]
    if (!/^Bearer$/i.test(scheme)) {
      throw new createError.BadRequestError()
    }

    try {
      const decoded = await jwt.verify(token, secret)
    } catch (error) {
      fastify.log.error(error)
      throw new createError.Unauthorized()
    }
  })
}

export default fp(authPlugin)
