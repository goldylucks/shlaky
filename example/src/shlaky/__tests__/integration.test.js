import setup from '../actions/setup'
import config from '../../config'

const overrides = { App: () => 'Shlaky test app' }

let facade = {}

const axios = jest.fn(({ method, url }) => {
  let data
  if (method === 'get' && url === '/api/tasks') {
    data = []
  }
  if (method === 'get' && url === '/api/users') {
    data = []
  }
  return Promise.resolve({ data })
})

beforeEach(() => {
  const shlaky = setup({ config, overrides, axios })
  facade = shlaky.facade
  axios.mockClear()
})

describe('constants', () => {
  test('states', () => {
    expect(facade.constants.INITIAL).toEqual('initial')
    expect(facade.constants.LOADING).toEqual('loading')
    expect(facade.constants.PENDING).toEqual('pending')
    expect(facade.constants.LOADED).toEqual('loaded')
    expect(facade.constants.ERROR).toEqual('error')
    expect(facade.constants.SUCCESS).toEqual('success')
  })
})

describe('utils', () => {
  test('env', () => {
    expect(facade.utils.env.isDev()).toEqual(false)
  })
})

describe('helpers', () => {
  test('endpoints', () => {
    const result = facade.helpers.endpoints.tasks.add()
    expect(result).toEqual('/tasks')
  })
})

describe('managers', () => {
  test('api', () => {
    facade.managers.api.tasks.all()
    expect(axios).toBeCalledTimes(1)
  })
})

describe('services', () => {
  test('resource', () => {
    facade.services.resource.tasks.all()
    expect(axios).toBeCalledTimes(1)
  })
})

describe('stores', () => {
  test('resource stores defined', () => {
    expect(facade.stores.tasks).toEqual(expect.any(Object))
    expect(facade.stores.users).toEqual(expect.any(Object))
  })
  test('state stores defined', () => {
    expect(facade.stores.visualMode).toEqual(expect.any(Object))
  })
  test('currentUser store defined', () => {
    expect(facade.stores.currentUser).toEqual(expect.any(Object))
  })
  test('auth store defined', () => {
    expect(facade.stores.auth).toEqual(expect.any(Object))
  })
})

describe('facade', () => {
  test('tasks', async () => {
    await testPopulate({ key: 'tasks' })
  })

  test('users', async () => {
    await testPopulate({ key: 'users' })
  })

  test('visualMode - init', () => {
    expect(facade.visualMode.get()).toEqual('light')
    expect(facade.visualMode.is('light')).toEqual(true)
    expect(facade.visualMode.is('dark')).toEqual(false)
  })

  test('visualMode - set to dark', () => {
    // when
    facade.visualMode.set('dark')
    // then
    expect(facade.visualMode.get()).toEqual('dark')
    expect(facade.visualMode.is('dark')).toEqual(true)
    expect(facade.visualMode.is('light')).toEqual(false)
  })

  test('visualMode - set to not allowed', () => {
    // when
    const throwing = () => facade.visualMode.set('not allowed')
    expect(throwing).toThrowErrorMatchingSnapshot(
      'visual mode set to not allowed'
    )
    // then
    expect(facade.visualMode.get()).toEqual('light')
    expect(facade.visualMode.is('light')).toEqual(true)
    expect(facade.visualMode.is('dark')).toEqual(false)
  })
})

/*
 * Helpers - resource store populate
 */
async function testPopulate({ key }) {
  // when
  const populateCall = facade[key].populate()
  // then
  testPopulateCall({ key })
  await populateCall
  testPopulateAwait({ key })
}

function testPopulateCall({ key }) {
  expect(facade[key].isEmpty()).toEqual(false)
  expect(facade[key].populateIsLoading()).toEqual(true)
  expect(facade[key].populateIsLoaded()).toEqual(false)
  expect(facade[key].populateHasError()).toEqual(false)
  expect(facade[key].all()).toEqual([])
  expect(axios).toBeCalledTimes(1)
  expect(axios).toBeCalledWith({
    data: {},
    headers: new Headers(),
    url: `/api/${key}`,
    method: 'get',
  })
}

function testPopulateAwait({ key }) {
  expect(facade[key].isEmpty()).toEqual(true)
  expect(facade[key].populateIsLoading()).toEqual(false)
  expect(facade[key].populateIsLoaded()).toEqual(true)
  expect(facade[key].populateHasError()).toEqual(false)
  expect(facade[key].all()).toEqual([])
}
