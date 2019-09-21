/* eslint-disable no-underscore-dangle */
import Store from '../Store'

let cut

beforeEach(() => {
  cut = getConsumingStore()
})

describe('_name', () => {
  const _name = 'someConsuming'
  it('works', () => {
    // when
    const result = cut._name

    // then
    expect(result).toBe(_name)
  })
})

describe('_displayName', () => {
  it('works', () => {
    // when
    const result = cut._displayName

    // then
    expect(result).toBe('SomeConsuming store')
  })
})

/*
 * Helpers
 */
class SomeConsumingStore extends Store {}

function getConsumingStore() {
  const utils = {
    misc: {
      randomId: jest.fn(() => 'tempId'),
    },
  }
  const helpers = {}
  const managers = {}
  const services = {}
  return new SomeConsumingStore({ utils, helpers, managers, services })
}
