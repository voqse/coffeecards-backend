import { access } from './testUtils.js'
import buildServer from '../src/server.js'

const server = buildServer()

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('Get 401 when no token', async () => {
  const { statusCode } = await access(server, { headers: {} })
  expect(statusCode).toBe(401)
})

test('Get 401 when invalid token', async () => {
  const { statusCode } = await access(server, { secret: 'invalid' })
  expect(statusCode).toBe(401)
})

test('Get 401 when token expired', async () => {
  const { statusCode } = await access(server, { expiresIn: '0s' })
  expect(statusCode).toBe(401)
})

test('Get 401 when token issuer is wrong', async () => {
  const { statusCode } = await access(server, {
    issuer: 'https://wrong.example.com',
  })
  expect(statusCode).toBe(401)
})

test('Get 200 if token valid', async () => {
  const { statusCode } = await access(server)
  expect(statusCode).toBe(200)
})
