import { jest } from '@jest/globals'

function createService() {
  return {
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }
}

export default function createMockDatabase() {
  const services = {
    card: createService(),
    deck: createService(),
    collection: createService(),
  }

  const database = {
    get: () => services,
    connect: jest.fn(),
    close: jest.fn(),
  }

  return { database, services }
}
