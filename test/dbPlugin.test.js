import jest from 'jest-mock'
import createServer from '../src/server.js'

const provider = {
  get: jest.fn(),
  connect: jest.fn(),
  close: jest.fn(),
}
const server = createServer({ db: { provider } })

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('Fastify instance should contain db', async () => {
  expect(server.db).toBeDefined()
})
