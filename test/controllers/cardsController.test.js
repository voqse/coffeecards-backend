import buildServer from '../../src/server.js'
import { insertMockData } from '../helpers/mockData.js'
import { buildHeaders } from '../helpers/testUtils.js'

const mongooseOpts = {
  uri: process.env.MONGODB_URI + '-test',
}
const server = buildServer({ mongooseOpts })

beforeAll(async () => {
  await server.ready()
})

beforeEach(async () => {
  await insertMockData(server.mongoose)
})

afterAll(async () => {
  await server.close()
})

test('List all user cards', async () => {
  const { statusCode, body } = server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildHeaders(),
  })
  expect(statusCode).toBe(200)
})

test('List all user cards filtered by deck', async () => {
  const { statusCode, body } = server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildHeaders(),
  })
  expect(response.statusCode).toBe(200)
})

test('List all user cards filtered by collection', async () => {
  // todo
})

test('Add a new card', async () => {
  // todo
})

test('Show the card', async () => {
  // todo
})

test('Edit the card', async () => {
  // todo
})

test('Remove the card', async () => {
  // todo
})
