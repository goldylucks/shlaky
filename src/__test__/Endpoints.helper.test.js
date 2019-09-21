import EndpointsHelper from '../Endpoints.helper'

let cut

const config = global.mockConfig

beforeEach(() => {
  cut = new EndpointsHelper({ config })
})

describe('setup', () => {
  beforeEach(() => {
    cut.setupResource = jest.fn()
  })
  afterEach(() => {
    cut.setupResource.mockRestore()
  })
  it('calls setupResource', () => {
    // when
    cut.setup()

    // then
    expect(cut.setupResource).toHaveBeenCalledTimes(3)
  })
})

describe('setupCurrentUser', () => {
  it('adds methods [refresh, update]', () => {
    // when
    cut.setupCurrentUser()

    // then
    expect(cut.currentUser.refresh).toEqual(expect.any(Function))
    expect(cut.currentUser.update).toEqual(expect.any(Function))

    // when
    const refreshEndpoint = cut.currentUser.refresh(1)
    const updateEndpoint = cut.currentUser.update(1)

    // then
    expect(refreshEndpoint).toEqual('/users/1')
    expect(updateEndpoint).toEqual('/users/1')
  })
})

describe('setupShorthandResource', () => {
  it('adds methods [add, all]', () => {
    // when
    cut.setupShorthandResource('stats')

    // then
    expect(cut.stats.add).toEqual(expect.any(Function))
    expect(cut.stats.all).toEqual(expect.any(Function))

    // when
    const addEndpoint = cut.stats.add({ count: 1 })
    const allEndpoint = cut.stats.all()

    // then
    expect(addEndpoint).toEqual('/stats')
    expect(allEndpoint).toEqual('/stats')
  })
})
