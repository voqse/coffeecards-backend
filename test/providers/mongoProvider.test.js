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
  const provider = createMongoProvider({ uri: testUri }).connect()

  expect(provider.services).toHaveProperty('card')
  expect(provider.services).toHaveProperty('deck')
  expect(provider.services).toHaveProperty('collection')
})

test('Should close the connection', async () => {
  const provider = createMongoProvider({ uri: testUri }).connect()
  expect(await provider.close()).toBeTruthy()
})
