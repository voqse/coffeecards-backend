import buildServer from '../../src/server.js'
import { access } from '../testUtils.js'

const mongooseOpts = {
  uri: process.env.MONGODB_URI + '-test',
}
const server = buildServer({ mongooseOpts })

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('List all user cards', async () => {
  const response = await access(server, '/cards')

  response.body //?
  expect(response.statusCode).toBe(200)
})

test('List all user cards filtered by deck', async () => {
  // todo
})

test('List all user cards filtered by collection', async () => {
  // todo
})

test('Add a new card', async () => {
  // todo
})

test('Show the card', async () => {
  // todo
})

test('Edit the card', async () => {
  // todo
})

test('Remove the card', async () => {
  // todo
})
