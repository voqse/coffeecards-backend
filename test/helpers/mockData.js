export const mockCards = [
  {
    _id: '61d5ef379dfea500eec5253d',
    title: 'Card 1',
    definition: 'Definition 1',
    userId: '6202e612e83a8281862bfd84',
    deckIds: ['62036476c2be0d3d427ad7cb'],
  },
  {
    _id: '61d5ef379dfea550eec5253c',
    title: 'Card 2',
    definition: 'Definition 2',
    userId: '6202e612e83a8281862bfd84',
    deckIds: ['62036476c2be0d3d427ad7cb'],
  },
  {
    _id: '630267bb8792fd88da129663',
    title: 'Card 3',
    definition: 'Definition 3',
    userId: '6202e612e83a8281862bfd84',
    deckIds: ['630267bb8792fd88da129662'],
  },
  {
    _id: '630267bb8792fd88da129668',
    title: 'Card 4',
    definition: 'Definition 4',
    userId: '6202e612e83a8281862bfd88',
    deckIds: ['630267bb8792fd88da129662'],
  },
]

export const mockDecks = [
  {
    _id: '62036476c2be0d3d427ad7cb',
    name: 'Deck 1',
    userId: '6202e612e83a8281862bfd84',
    collectionId: '61d5ef379dfea500eec5253c',
  },
  {
    _id: '630267bb8792fd88da129662',
    name: 'Deck 2',
    userId: '6202e612e83a8281862bfd84',
    collectionId: '61d5ef379dfea500eec5253c',
  },
]

export const mockCollections = [
  {
    _id: '61d5ef379dfea500eec5253c',
    name: 'Collection 1',
    userId: '6202e612e83a8281862bfd84',
  },
]

export async function insertMockData(mongoose) {
  const { Card, Deck, Collection } = mongoose.models

  await Card.insertMany(mockCards)
  await Deck.insertMany(mockDecks)
  await Collection.insertMany(mockCollections)
}

export async function clearMockData(mongoose) {
  await mongoose.dropDatabase()
}
