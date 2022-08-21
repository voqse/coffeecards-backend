import buildServer from '../src/server.js'

const mongooseOpts = {
  uri: process.env.MONGODB_URI + '-test',
}
const server = buildServer({ mongooseOpts })

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('Fastify instance should contain mongoose', async () => {
  expect(server.mongoose).toBeDefined()
  expect(server.mongoose.models.Card).toBeDefined()
  expect(server.mongoose.models.Deck).toBeDefined()
  expect(server.mongoose.models.Collection).toBeDefined()
})
