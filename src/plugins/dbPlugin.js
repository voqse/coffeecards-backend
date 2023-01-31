import fp from 'fastify-plugin'

async function dbPlugin(fastify, options) {
  const { database } = options
  database.connect()

  fastify.addHook('onClose', async () => {
    await database.close()
  })

  fastify.decorate('db', database.get())
}

export default fp(dbPlugin)
