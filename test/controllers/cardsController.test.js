import buildServer from '../../src/server.js'
import { clearMockData, insertMockData } from '../helpers/mockData.js'
import { getAuthHeaders } from '../helpers/testUtils.js'

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
    headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
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
  const { statusCode, body } = await server.inject({
    method: 'POST',
    url: '/cards/new',
    headers: getAuthHeaders(),
    payload: {
      title: 'New card',
      definition: 'New card description',
      deckIds: ['62036476c2be0d3d427ad7cb'],
    },
  })

  expect(statusCode).toBe(201)
})

test('Show card', async () => {
  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/cards/61d5ef379dfea500eec5253d',
    headers: getAuthHeaders(),
  })
  const data = JSON.parse(body)

  expect(statusCode).toBe(200)
  expect(data && typeof data === 'object').toBeTruthy()
  expect(data.title).toBe('Card 1')
})

test('Show card which does not exist', async () => {
  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/cards/61d5ef379dfea505ecc5253d',
    headers: getAuthHeaders(),
  })
  const data = JSON.parse(body)

  expect(statusCode).toBe(404)
})

test('Edit card', async () => {
  const { body: bodyOld } = await server.inject({
    method: 'GET',
    url: '/cards/61d5ef379dfea500eec5253d',
    headers: getAuthHeaders(),
  })
  const dataOld = JSON.parse(bodyOld)

  const { statusCode, body: bodyNew } = await server.inject({
    method: 'PUT',
    url: '/cards/61d5ef379dfea500eec5253d',
    headers: getAuthHeaders(),
    payload: {
      title: 'Card 1 edited',
    },
  })
  const dataNew = JSON.parse(bodyNew)

  expect(statusCode).toBe(200)
  expect(dataNew.title).toBe('Card 1 edited')
  expect(dataNew.definition).toBe('Definition 1')
})

test('Remove card', async () => {
  await server.inject({
    method: 'DELETE',
    url: '/cards/61d5ef379dfea500eec5253d',
    headers: getAuthHeaders(),
  })

  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards/61d5ef379dfea500eec5253d',
    headers: getAuthHeaders(),
  })

  expect(statusCode).toBe(404)
})
