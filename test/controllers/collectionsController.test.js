import { beforeAll, expect } from '@jest/globals'
import mongoose from 'mongoose'
import createServer from '../../src/server.js'
import createMongoProvider from '../../src/providers/mongoProvider.js'
import { getAuthHeaders } from '../helpers/testUtils.js'
import { cardSchema } from '../../src/schemas/cardSchema.js'
import { deckSchema } from '../../src/schemas/deckSchema.js'
import { collectionSchema } from '../../src/schemas/collectionSchema.js'
import {
  mockCards,
  mockCollections,
  mockDecks,
  mockUsers,
} from '../helpers/mockData.js'

const uri = process.env.MONGODB_URI + '-provider-test'
const server = createServer({ database: createMongoProvider({ uri }) })

beforeAll(async () => {
  await server.ready()

  /** @type {ConnectOptions} */
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const connection = await mongoose.createConnection(uri, opts).asPromise()

  await connection.dropDatabase()
  await connection.model('Card', cardSchema).insertMany(mockCards)
  await connection.model('Deck', deckSchema).insertMany(mockDecks)
  await connection
    .model('Collection', collectionSchema)
    .insertMany(mockCollections)
  await connection.close()
})

afterAll(async () => {
  await server.close()
})

test('shows all user collections', async () => {
  const userCollections = mockCollections.filter(
    (collection) => collection.userId === mockUsers[0]._id,
  )
  const { body } = await server.inject({
    method: 'GET',
    url: '/',
    headers: getAuthHeaders(),
  })
  const data = JSON.parse(body)

  expect(data.length).toBe(userCollections.length)
})

test('shows one user collection', async () => {
  const userDecks = mockDecks.filter((deck) => deck.userId === mockUsers[0]._id)
  const { body } = await server.inject({
    method: 'GET',
    url: '/61d5ef379dfea500eec5253c',
    headers: getAuthHeaders(),
  })
  const data = JSON.parse(body)

  expect(data.length).toBe(userDecks.length)
})

test('check request body', async () => {
  const { body } = await server.inject({
    method: 'POST',
    url: '/new',
    headers: getAuthHeaders(),
    body: {
      name: 'New collection',
      test: true,
      delete: true,
    },
  })
  const data = JSON.parse(body)

  expect(data).not.toHaveProperty('test')
  expect(data).not.toHaveProperty('delete')
})

test('owner id set correctly', async () => {
  const { body } = await server.inject({
    method: 'POST',
    url: '/new',
    headers: getAuthHeaders(),
    body: {
      name: 'New collection 2',
      test: true,
      delete: true,
    },
  })
  const data = JSON.parse(body)

  expect(data.userId).toBe(mockUsers[0]._id)
})
