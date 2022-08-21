import 'dotenv/config'
import buildServer from './server.js'

const config = {
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 5000,
}

const server = buildServer({
  logger: process.env.NODE_ENV === 'development',
})

try {
  await server.listen(config)
  console.log(
    `repeat-backend is listening on http://${config.host}:${config.port}`,
  )
} catch (error) {
  server.log.error(error)
  process.exit(1)
}
