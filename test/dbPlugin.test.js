import createServer from '../src/server.js'
import { createMockDatabase } from './helpers/mockDb.js'

const { database } = createMockDatabase()
const server = createServer({ database })

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('Fastify instance should contain db', async () => {
  expect(server.db).toBeDefined()
})
