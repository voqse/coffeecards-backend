import { test, expect, beforeAll, afterAll } from '@jest/globals'
import createServer from '../src/server.js'
import createMockDatabase from './helpers/mockDb.js'
import { getAuthHeaders } from './helpers/testUtils.js'

const { database } = createMockDatabase()
const server = createServer({ database })

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
    headers: getAuthHeaders({ secret: 'invalid' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token expired', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: getAuthHeaders({ expiresIn: '0s' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token issuer is wrong', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: getAuthHeaders({ issuer: 'https://wrong.example.com' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 is subject is not valid ObjectId', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: getAuthHeaders({ subject: '123' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 200 if token valid', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/cards',
    headers: getAuthHeaders(),
  })
  expect(statusCode).toBe(200)
})
