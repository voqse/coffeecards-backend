import { test, expect, beforeAll, afterAll } from '@jest/globals'
import createServer from '../src/server.js'
import createMockDatabase from './helpers/mockDb.js'

const { database } = createMockDatabase()
const server = createServer({ database })

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('Fastify instance should contain bd', () => {
  expect(server.db).toBeDefined()
})

test('DB should connect() on server start', () => {
  expect(database.connect.mock.calls.length).toBe(1)
})

test('DB should close() on server stop', async () => {
  await server.close()
  expect(database.close.mock.calls.length).toBe(1)
})
