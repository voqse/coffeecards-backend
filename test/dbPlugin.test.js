import { test, expect, beforeEach, afterEach } from '@jest/globals'
import fastify from 'fastify'
import dbPlugin from '../src/plugins/dbPlugin.js'
import createMockDatabase from './helpers/mockDb.js'

let server
let database

beforeEach(async () => {
  database = createMockDatabase().database
  server = fastify()
  server.register(dbPlugin, { database })
  await server.ready()
})

afterEach(async () => {
  await server.close()
})

test('throws an error if no database provided', async () => {
  expect.assertions(1)
  await expect(dbPlugin(fastify())).rejects.toThrow()
})

test('injects DB instance into server', () => {
  expect(server.db).toBeDefined()
})

test('calls connect() on server start', () => {
  expect(database.connect.mock.calls.length).toBe(1)
})

test('calls close() on server stop', async () => {
  await server.close()
  expect(database.close.mock.calls.length).toBe(1)
})
