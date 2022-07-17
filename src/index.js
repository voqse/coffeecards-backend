import 'dotenv/config'
import buildServer from './server.js'
import { connectDB } from './db.js'

const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5000,
}

const server = buildServer({
  logger: process.env.NODE_ENV === 'development',
})

try {
  await connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/repeat-dev')
  await server.listen(config)
  console.log(
    `auth-backend is listening on http://${config.host}:${config.port}`,
  )
} catch (error) {
  server.log.error(error)
  process.exit(1)
}
