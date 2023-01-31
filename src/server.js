import fastify from 'fastify'
import authPlugin from './plugins/authPlugin.js'
import dbPlugin from './plugins/dbPlugin.js'
import router from './router.js'
import createMongoProvider from './providers/mongoProvider.js'
import { objectsMergeDeep } from './utils.js'

const defaultOptions = {
  auth: {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISS,
  },
  database: createMongoProvider({ uri: process.env.MONGODB_URI }),
}

export default function createServer(options) {
  const optionsBase = objectsMergeDeep(defaultOptions, options || {})
  const server = fastify(optionsBase)

  // Register middlewares
  // server.register(helmet)
  // server.register(cors, {
  //   origin: /voqse\.com$/,
  // })
  // server.register(cookie, {
  //   secret: process.env.COOKIES_SECRET || 'you-must-define-a-secret', // for cookies signature
  //   // parseOptions: {}, // options for parsing cookies
  // })
  server.register(authPlugin, optionsBase.auth)
  server.register(dbPlugin, optionsBase)
  server.register(router)

  return server
}
