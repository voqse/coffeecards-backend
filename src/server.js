import fastify from 'fastify'
import authPlugin from './plugins/authPlugin.js'
import mongoosePlugin from './plugins/mongoosePlugin.js'
import router from './router.js'

export default function buildServer(options = {}) {
  // TODO: Figure out what to do with all that nested options
  const {
    authOpts = {
      secret: process.env.JWT_SECRET,
      issuer: process.env.JWT_ISS,
    },
    mongooseOpts = {
      uri: process.env.MONGODB_URI,
    },
    ...fastifyOpts
  } = options

  const server = fastify(fastifyOpts)

  // Register middlewares
  // server.register(helmet)
  // server.register(cors, {
  //   origin: /voqse\.com$/,
  // })
  // server.register(cookie, {
  //   secret: process.env.COOKIES_SECRET || 'you-must-define-a-secret', // for cookies signature
  //   // parseOptions: {}, // options for parsing cookies
  // })
  server.register(authPlugin, authOpts)
  server.register(mongoosePlugin, mongooseOpts)
  server.register(router)

  return server
}
