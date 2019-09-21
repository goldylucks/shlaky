/* eslint-disable no-underscore-dangle */
import ResourceStore from '../Resource.store'

const LOADED = 'loaded'

const mockedAll = [{ foo: 'bar' }]
const mockedToAdd = { foo: 'to add' }
const mockedToAddResponse = { foo: 'to add', id: 'sa8d7f6' }

let cut

beforeEach(() => {
  cut = getSomeConsumingResourceStore()
})

describe('populate', () => {
  it('works', async () => {
    // when
    await cut.populate()

    // then
    expect(cut._all).toEqual(mockedAll)
    expect(cut.populateState).toEqual(LOADED)
  })
})

describe('add', () => {
  it('works', async () => {
    // when
    await cut.add(mockedToAdd)

    // then
    expect(cut._all).toEqual([mockedToAddResponse])
    expect(cut.addState).toEqual(LOADED)
  })
})

/*
 * Helpers
 */
class SomeConsumingResourceStore extends ResourceStore {}

function getSomeConsumingResourceStore() {
  const utils = {
    misc: {
      randomId: jest.fn(() => 'tempId'),
    },
  }
  const helpers = {}
  const managers = {}
  const services = {
    resource: {
      someConsumingResource: {
        all: jest.fn(() => ({ data: mockedAll })),
        add: jest.fn(() => ({ data: mockedToAddResponse })),
      },
    },
  }
  return new SomeConsumingResourceStore({ utils, helpers, managers, services })
}
