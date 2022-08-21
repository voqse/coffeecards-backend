import buildServer from '../src/server.js'
import { buildAuthHeaders } from './helpers/testUtils.js'

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
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when invalid token', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildAuthHeaders({ secret: 'invalid' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token expired', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildAuthHeaders({ expiresIn: '0s' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token issuer is wrong', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildAuthHeaders({ issuer: 'https://wrong.example.com' }),
  })
  expect(statusCode).toBe(401)
})

// This tests below isn't independent TODO: Figure out how to test this
// test('Get 401 when passing Auth Header with several tokens', async () => {
//   const { statusCode } = await server.inject({
//     method: 'GET',
//     url: '/cards',
//     headers: {
//       Authorization: 'Bearer token1 token2',
//     },
//   })
//   expect(statusCode).toBe(401)
// })
//
// test('Get 401 when auth scheme is not Bearer', async () => {
//   const { statusCode } = await server.inject({
//     method: 'GET',
//     url: '/cards',
//     headers: {
//       Authorization: 'Token token1',
//     },
//   })
//   expect(statusCode).toBe(401)
// })

test('Get 200 if token valid', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: buildAuthHeaders(),
  })
  expect(statusCode).toBe(200)
})
