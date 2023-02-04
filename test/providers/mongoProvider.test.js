import { test, expect } from '@jest/globals'
import createMongoProvider from '../../src/providers/mongoProvider.js'
import mongoose from 'mongoose'

const testUri = process.env.MONGODB_URI + '-test'

test('Should throw an error if no URI provided', () => {
  expect(createMongoProvider).toThrow()
})

test('Should connect to DB', async () => {
  const provider = createMongoProvider({ uri: testUri })
  const prevConnNum = mongoose.connections.length

  await provider.connect()
  expect(mongoose.connections.length).toBe(prevConnNum + 1)
})

test('Should close the connection', async () => {
  const provider = await createMongoProvider({ uri: testUri }).connect()
  const prevConnNum = mongoose.connections.length

  await provider.close()
  expect(mongoose.connections[prevConnNum - 1].readyState).toBe(0)
})

test('Should return services', async () => {
  const { services } = await createMongoProvider({ uri: testUri }).connect()

  expect(services).toHaveProperty('card')
  expect(services).toHaveProperty('deck')
  expect(services).toHaveProperty('collection')
})

// TODO ('get(filter) should return filtered items')
// TODO ('get(id) should return one item by id')
// TODO ('get(id) should return one item by id')
// TODO ('create(item) should return created item')
// TODO ('update(filter, item) should return updated item')
// TODO ('update(id, item) should return updated item')
// TODO ('remove(filter) should return removed item')
// TODO ('remove(id) should return removed item')
