import ApiManager from '../Api.manager'

const currentUserRefreshEndpoint = '/users'
const currentUserUpdateEndpoint = '/users'

const config = global.mockConfig
const axios = global.mockedAxios
const helpers = {
  endpoints: {
    currentUser: {
      refresh: jest.fn(() => currentUserRefreshEndpoint),
      update: jest.fn(() => currentUserUpdateEndpoint),
    },
  },
}

let cut

beforeEach(() => {
  cut = new ApiManager({ config, helpers, axios })
  cut.buildUrl = jest.fn(path => path)
})

describe('setup', () => {
  beforeEach(() => {
    cut.setupResource = jest.fn()
  })
  afterEach(() => {
    cut.setupResource.mockRestore()
  })
  it('calls setup resource', () => {
    // when
    cut.setup()

    // then
    expect(cut.setupResource).toHaveBeenCalledTimes(3)
    expect(cut.setupResource).toHaveBeenNthCalledWith(
      1,
      config.resources[0],
      0,
      config.resources
    )
    expect(cut.setupResource).toHaveBeenNthCalledWith(
      2,
      config.resources[1],
      1,
      config.resources
    )
    expect(cut.setupResource).toHaveBeenNthCalledWith(
      3,
      config.resources[2],
      2,
      config.resources
    )
  })
})

describe('setupShorthandResource', () => {
  it('setus up methods [add, all]', () => {
    // given
    const resource = 'tests'

    // when
    cut.setupShorthandResource(resource)

    // then
    expect(cut.tests.add).toEqual(expect.any(Function))
    expect(cut.tests.all).toEqual(expect.any(Function))
  })
})

describe('setupCurrentUser', () => {
  const currentUserId = 1
  beforeEach(() => {
    cut.setupCustomFields = jest.fn()
    cut.get = jest.fn()
    cut.currentUserId = currentUserId
  })
  afterEach(() => {
    cut.setupCustomFields.mockRestore()
  })
  it('adds refresh method and calls setupCustomFields', () => {
    // given
    const resource = config.resources[1]

    // when
    cut.setupCurrentUser(resource)

    // then
    expect(cut.currentUser.refresh).toEqual(expect.any(Function))
    expect(cut.setupCustomFields).toHaveBeenCalledTimes(1)
    expect(cut.setupCustomFields).toHaveBeenCalledWith(resource)

    // when
    cut.currentUser.refresh()

    // then
    expect(cut.helpers.endpoints.currentUser.refresh).toHaveBeenCalledTimes(1)
    expect(cut.buildUrl).toHaveBeenCalledTimes(1)
    expect(cut.buildUrl).toHaveBeenCalledWith(currentUserRefreshEndpoint)
    expect(cut.get).toHaveBeenCalledTimes(1)
    expect(cut.get).toHaveBeenCalledWith(currentUserRefreshEndpoint)
    expect(cut.helpers.endpoints.currentUser.refresh).toHaveBeenCalledWith(
      currentUserId
    )
  })
})

describe('setupCustomFields', () => {
  beforeEach(() => {
    cut.put = jest.fn()
  })
  afterEach(() => {
    cut.put.mockRestore()
  })
  it('sets up set methods', () => {
    // given
    const newName = 'Izaq'
    const resource = config.resources[1]

    // when
    cut.setupCustomFields(resource)

    // then
    expect(cut.currentUser).toEqual(expect.any(Object))
    expect(cut.currentUser.setCompetesInPushups).toEqual(expect.any(Function))
    expect(cut.currentUser.setCompetesInPullups).toEqual(expect.any(Function))
    expect(cut.currentUser.setName).toEqual(expect.any(Function))

    // when
    cut.currentUser.setName(newName)

    // then
    expect(cut.put).toHaveBeenCalledTimes(1)
    expect(cut.put).toHaveBeenCalledWith(currentUserRefreshEndpoint, {
      name: newName,
    })
  })
})
