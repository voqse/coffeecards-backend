import { test, expect, beforeEach, afterEach } from '@jest/globals'
import fastify from 'fastify'
import authPlugin from '../src/plugins/authPlugin.js'
import { getAuthHeaders } from './helpers/testUtils.js'

let server

beforeEach(async () => {
  server = fastify()
  server.register(authPlugin, {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
  })
  server.get('/test', async (request, reply) => reply.code(200).send())
  await server.ready()
})

afterEach(async () => {
  await server.close()
})

test('Get 401 when no token', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/test',
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when invalid token', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/test',
    headers: getAuthHeaders({ secret: 'invalid' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token expired', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/test',
    headers: getAuthHeaders({ expiresIn: '0s' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 when token issuer is wrong', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/test',
    headers: getAuthHeaders({ issuer: 'https://wrong.example.com' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 401 is subject is not valid ObjectId', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/test',
    headers: getAuthHeaders({ subject: '123' }),
  })
  expect(statusCode).toBe(401)
})

test('Get 200 if token valid', async () => {
  const { statusCode } = await server.inject({
    method: 'GET',
    url: '/test',
    headers: getAuthHeaders(),
  })
  expect(statusCode).toBe(200)
})
