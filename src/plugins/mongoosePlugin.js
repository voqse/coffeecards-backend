import fp from 'fastify-plugin'
import mongoose from 'mongoose'

async function mongoosePlugin(fastify, options = {}) {
  const { uri, ...mongooseOpts } = options

  if (!uri) {
    return new Error('You must define a uri')
  }

  const connection = await mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ...mongooseOpts,
  })

  fastify.addHook('onClose', async (instance) => {
    await connection.close()
  })

  fastify.decorate('mongoose', connection)
}

export default fp(mongoosePlugin)
