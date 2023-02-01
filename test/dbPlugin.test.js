import { test, expect, beforeAll, afterAll } from '@jest/globals'
import fastify from 'fastify'
import createMockDatabase from './helpers/mockDb.js'
import dbPlugin from '../src/plugins/dbPlugin.js'

const { database } = createMockDatabase()
const server = fastify()

beforeAll(async () => {
  server.register(dbPlugin, { database })
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('Should throw an error if no DB provided', async () => {
  expect.assertions(1)
  await expect(dbPlugin(fastify())).rejects.toThrow(Error)
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
