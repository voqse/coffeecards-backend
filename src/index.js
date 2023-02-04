import createServer from './server.js'

const startOptions = {
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 4010,
}

const server = createServer({
  logger: process.env.NODE_ENV === 'development',
})

try {
  await server.listen(startOptions)
  console.log(
    `repeat-backend is listening on http://${startOptions.host}:${startOptions.port}`,
  )
} catch (error) {
  server.log.error(error)
  process.exit(1)
}
