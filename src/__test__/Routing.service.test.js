import RoutingService from '../Routing.service'

let cut

const HOME_ROUTE = '/'
const TEST_ROUTE = '/test'

const config = {
  routes: [HOME_ROUTE, TEST_ROUTE],
}

beforeEach(() => {
  cut = new RoutingService({ config })
})

describe('setup', () => {
  beforeEach(() => {
    cut.setupRoute = jest.fn()
  })
  afterEach(() => {
    cut.setupRoute.mockRestore()
  })
  it('calls setupRoute', () => {
    // when
    cut.setup()

    // then
    expect(cut.setupRoute).toHaveBeenCalledTimes(2)
    expect(cut.setupRoute).toHaveBeenNthCalledWith(
      1,
      HOME_ROUTE,
      expect.anything(),
      expect.anything()
    )
    expect(cut.setupRoute).toHaveBeenNthCalledWith(
      2,
      TEST_ROUTE,
      expect.anything(),
      expect.anything()
    )
  })
})

describe('setupRoute', () => {
  it('setups route', () => {
    // given
    const route = '/test'

    // when
    cut.setupRoute(route)

    // then
    expect(cut.get.test).toEqual(expect.any(Function))
    expect(cut.is.test).toEqual(expect.any(Function))
    expect(cut.to.test).toEqual(expect.any(Function))
  })
})
