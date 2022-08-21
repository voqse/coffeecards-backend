import buildServer from '../../src/server.js'
import { clearMockData, insertMockData } from '../helpers/mockData.js'
import { buildAuthHeaders } from '../helpers/testUtils.js'

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

afterEach(async () => {
  await clearMockData(server.mongoose)
})

afterAll(async () => {
  await server.close()
})

test('List all user cards', async () => {
  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildAuthHeaders(),
  })
  const data = JSON.parse(body)

  expect(statusCode).toBe(200)
  expect(Array.isArray(data)).toBeTruthy()
  expect(data).toHaveLength(3)
})

test('List all user cards filtered by deck', async () => {
  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildAuthHeaders(),
    query: {
      deck: '62036476c2be0d3d427ad7cb',
    },
  })
  const data = JSON.parse(body)

  expect(statusCode).toBe(200)
  expect(Array.isArray(data)).toBeTruthy()
  expect(data).toHaveLength(2)
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
