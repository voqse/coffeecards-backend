import createServer from '../../src/server.js'
import createMockDatabase from '../helpers/mockDb.js'
import { getAuthHeaders } from '../helpers/testUtils.js'
import { mockDecks } from '../helpers/mockData.js'

const { database, services } = createMockDatabase()
const server = createServer({ database })

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('shows all user collections', async () => {
  const { body } = await server.inject({
    method: 'GET',
    url: '/',
    headers: getAuthHeaders(),
  })
  const data = JSON.parse(body)

  services.collection.get.mock.calls //?
})

test('shows one user collection', async () => {
  const { body } = await server.inject({
    method: 'GET',
    url: '/61d5ef379dfea500eec5253c',
    headers: getAuthHeaders(),
  })
  const data = JSON.parse(body)

  services.collection.get.mock.calls //?
})
