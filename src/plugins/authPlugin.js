import fp from 'fastify-plugin'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

async function authPlugin(fastify, options) {
  const { secret, ...jwtOpts } = options || {}

  if (!secret) {
    throw new Error('You must define a secret')
  }

  const messages = {
    header: 'Bad authorization header',
    token: 'Invalid token',
  }

  fastify.decorateRequest('user', null)

  fastify.addHook('onRequest', async (request) => {
    const { authorization } = request.headers

    if (!authorization) {
      throw new createError(401, messages.header)
    }

    const parts = authorization.split(' ')
    if (parts.length !== 2) {
      throw new createError(401, messages.header)
    }

    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme)) {
      throw new createError(401, messages.header)
    }

    try {
      request.user = await jwt.verify(token, secret, jwtOpts)
    } catch (error) {
      fastify.log.error(error)
      throw new createError(401, messages.token)
    }

    if (!ObjectId.isValid(request.user.sub)) {
      throw new createError(401, messages.token)
    }
  })
}

export default fp(authPlugin)
