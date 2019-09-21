import ResourceService from '../Resource.service'

let cut

beforeEach(() => {
  cut = new ResourceService({
    config: global.mockConfig,
    managers: {
      api: {
        foo: {
          add: jest.fn(),
          all: jest.fn(),
          update: jest.fn(),
        },
        currentUser: {
          create: jest.fn(),
          refresh: jest.fn(),
          update: jest.fn(),
        },
      },
    },
  })
})

describe('setupCurrentUser', () => {
  it('creates methods create, refresh, cand calls configCustomFields', () => {
    // given
    cut.configCustomFields = jest.fn()
    const resource = {
      name: 'currentUser',
      fields: { foo: 'string', bar: 'bool' },
    }

    // when
    cut.setupCurrentUser(resource)

    // then
    expect(cut.currentUser.create).toEqual(expect.any(Function))
    expect(cut.currentUser.refresh).toEqual(expect.any(Function))
    expect(cut.configCustomFields).toHaveBeenCalledTimes(1)
    expect(cut.configCustomFields).toHaveBeenCalledWith(resource)

    // given
    const refreshArgs = 'foo'

    // when
    cut.currentUser.refresh(refreshArgs)

    // then
    expect(cut.managers.api.currentUser.refresh).toHaveBeenCalledTimes(1)
    expect(cut.managers.api.currentUser.refresh).toHaveBeenCalledWith(
      refreshArgs
    )

    // given
    const createArgs = { foo: 'bar' }

    // when
    cut.currentUser.create(createArgs)

    // then
    expect(cut.managers.api.currentUser.create).toHaveBeenCalledTimes(1)
    expect(cut.managers.api.currentUser.create).toHaveBeenCalledWith(createArgs)
  })
})

describe('setupShorthandResource', () => {
  it('creates methods add, all', () => {
    // given
    const resource = 'foo'

    // when
    cut.setupShorthandResource(resource)

    // then
    expect(cut.foo.add).toEqual(expect.any(Function))
    expect(cut.foo.all).toEqual(expect.any(Function))

    // given
    const addArg = { bar: 'baz' }

    // when
    cut.foo.add(addArg)

    // then
    expect(cut.managers.api.foo.add).toHaveBeenCalledTimes(1)
    expect(cut.managers.api.foo.add).toHaveBeenCalledWith(addArg)

    // given
    const allArg = { some: 'filter' }

    // when
    cut.foo.all(allArg)

    // then
    expect(cut.managers.api.foo.all).toHaveBeenCalledTimes(1)
    expect(cut.managers.api.foo.all).toHaveBeenCalledWith(allArg)
  })
})

describe('setupCustomResource', () => {
  it('calls setupShorthandResource, configCustomFields', () => {
    // given
    cut.setupShorthandResource = jest.fn()
    cut.configCustomFields = jest.fn()
    const name = 'foo'
    const resource = { name, fields: { age: 'number' } }

    // when
    cut.setupCustomResource(resource)

    // then
    expect(cut.setupShorthandResource).toHaveBeenCalledTimes(1)
    expect(cut.setupShorthandResource).toHaveBeenCalledWith(name)
    expect(cut.configCustomFields).toHaveBeenCalledTimes(1)
    expect(cut.configCustomFields).toHaveBeenCalledWith(resource)
  })
})

describe('configCustomFields', () => {
  it('creates method setAge, setName', () => {
    // given
    const resource = { name: 'foo', fields: { age: 'number', name: 'string' } }

    // when
    cut.configCustomFields(resource)

    // then
    expect(cut.foo.setAge).toEqual(expect.any(Function))

    // given
    const newValue = 14

    // when
    cut.foo.setAge(newValue)

    // then
    expect(cut.managers.api.foo.update).toHaveBeenCalledTimes(1)
    expect(cut.managers.api.foo.update).toHaveBeenCalledWith({ age: newValue })
  })
})
