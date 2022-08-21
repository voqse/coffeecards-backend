import buildServer from '../src/server.js'
import { buildHeaders } from './helpers/testUtils.js'

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

test('Get 401 when no token', async () => {
  const { statusCode } = server.inject({
    method: 'GET',
    url: '/cards',
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when invalid token', async () => {
  const { statusCode } = server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildHeaders({ secret: 'invalid' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token expired', async () => {
  const { statusCode } = server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildHeaders({ expiresIn: '0s' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token issuer is wrong', async () => {
  const { statusCode } = server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildHeaders({ issuer: 'https://wrong.example.com' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 200 if token valid', async () => {
  const { statusCode } = server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildHeaders(),
  })
  expect(statusCode).toBe(200)
})
