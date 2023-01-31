import fp from 'fastify-plugin'

async function dbPlugin(fastify, options) {
  const { database } = options || {}

  if (!database) {
    throw new Error('You must provide a database')
  }

  database.connect()

  fastify.addHook('onClose', async () => {
    await database.close()
  })

  fastify.decorate('db', database.getInstance())
}

export default fp(dbPlugin)
