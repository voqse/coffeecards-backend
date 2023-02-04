import { test, expect, describe, afterAll, beforeAll } from '@jest/globals'
import createMongoProvider, {
  createMongoService,
} from '../../src/providers/mongoProvider.js'
import mongoose from 'mongoose'
import { cardSchema } from '../../src/schemas/cardSchema.js'
import { mockCards } from '../helpers/mockData.js'

const testUri = process.env.MONGODB_URI + '-test'

describe('createMongoProvider', () => {
  test('throws an error if no URI provided', () => {
    expect(createMongoProvider).toThrow()
  })

  test('opens a connection', async () => {
    const provider = createMongoProvider({ uri: testUri })
    const lastConnectionsCount = mongoose.connections.length

    await provider.connect()
    expect(mongoose.connections.length).toBe(lastConnectionsCount + 1)
  })

  test('closes the connection', async () => {
    const provider = await createMongoProvider({ uri: testUri }).connect()
    const connectionIndex = mongoose.connections.length - 1

    // expect(mongoose.connections[connectionIndex].readyState).toBe(1)
    await provider.close()
    expect(mongoose.connections[connectionIndex].readyState).toBe(0)
  })

  test('returns services', async () => {
    const { services } = await createMongoProvider({ uri: testUri }).connect()

    expect(services).toHaveProperty('card')
    expect(services).toHaveProperty('deck')
    expect(services).toHaveProperty('collection')
  })
})

describe('createMongoService', () => {
  let connection
  let service

  beforeAll(async () => {
    /** @type {ConnectOptions} */
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    connection = await mongoose.createConnection(testUri, opts).asPromise()
    await connection.dropDatabase()
    const TestModel = connection.model('TestModel', cardSchema)
    await TestModel.insertMany(mockCards)
    service = createMongoService(TestModel)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  test('gets items by id', async () => {
    for (const card of mockCards) {
      const result = await service.get(card._id)
      expect(result.title).toBe(card.title)
    }
  })

  test('gets items by filter', async () => {
    const ownerId = '6202e612e83a8281862bfd84'
    const filteredItems = mockCards.filter((card) => card.userId === ownerId)
    const result = await service.get({ userId: ownerId })

    expect(result.length).toBeLessThan(mockCards.length)
    expect(result.length).toBe(filteredItems.length)
  })

  test('creates item and returns created item', async () => {
    const result = await service.create({
      title: 'New item',
      definition: 'With new definition',
      userId: '6202e612e83a8281862bfd84',
    })

    expect(result.title).toBe('New item')
  })

  test('updates item by id', async () => {
    const before = await service.get(mockCards[0]._id)
    const after = await service.update(mockCards[0]._id, {
      title: 'Edited title',
    })

    expect(after.title).not.toBe(before.title)
    expect(after.title).toBe('Edited title')
  })

  test('returns null if strict filter', async () => {
    const before = await service.get('61d5ef379dfea550eec5253c')
    const after = await service.update(
      {
        _id: '61d5ef379dfea550eec5253c',
        userId: '6202e612e83a8281862bfd88',
      },
      {
        title: 'Edited title',
      },
    )

    expect(before.title).not.toBe('Edited title')
    expect(after).toBeFalsy()
  })

  // TODO ('update(id, item) should return updated item')
  // TODO ('remove(filter) should return removed item')
  // TODO ('remove(id) should return removed item')
})
