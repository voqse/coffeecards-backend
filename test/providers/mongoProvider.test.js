import { test, expect } from '@jest/globals'
import createMongoProvider from '../../src/providers/mongoProvider.js'

const testUri = process.env.MONGODB_URI + '-test'

test('Should throw an error if no URI provided', () => {
  expect(createMongoProvider).toThrow()
})

test('Should return methods', () => {
  const provider = createMongoProvider({ uri: testUri }).connect()

  expect(typeof provider.connect).toBe('function')
  expect(typeof provider.close).toBe('function')
  expect(typeof provider.services).toBe('object')
})

test('Should return services', () => {
  const { services } = createMongoProvider({ uri: testUri }).connect()

  expect(services).toHaveProperty('card')
  expect(services).toHaveProperty('deck')
  expect(services).toHaveProperty('collection')
})

test('Should close the connection', async () => {
  const provider = createMongoProvider({ uri: testUri }).connect()

  expect(await provider.close()).toBeTruthy()
})

// TODO ('get(filter) should return filtered items')
// TODO ('get(id) should return one item by id')
// TODO ('get(id) should return one item by id')
// TODO ('create(item) should return created item')
// TODO ('update(filter, item) should return updated item')
// TODO ('update(id, item) should return updated item')
// TODO ('remove(filter) should return removed item')
// TODO ('remove(id) should return removed item')
