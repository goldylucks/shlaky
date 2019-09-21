import Facade from '../Facade'

let cut

const config = global.mockConfig

Facade.prototype.setup = jest.fn()

beforeEach(() => {
  cut = new Facade({ config })
})

afterEach(() => {
  Facade.prototype.setup.mockClear()
})

describe('setupState', () => {
  beforeEach(() => {
    cut.setupEnumField = jest.fn()
  })
  afterEach(() => {
    cut.setupEnumField.mockRestore()
  })

  it('adds get/set methods and calls setupEnumField', () => {
    // given
    const key = 'sport'
    const name = 'current'
    const allowed = ['pullups', 'pushups']
    const fields = [
      {
        name,
        type: 'enum',
        allowed,
        initial: 'pullups',
      },
    ]

    // when
    cut.setupState([key, { fields }])

    // then
    expect(cut.sport.current.set).toEqual(expect.any(Function))
    expect(cut.sport.current.value).toEqual(expect.any(Function))
    expect(cut.setupEnumField).toHaveBeenCalledTimes(1)
    expect(cut.setupEnumField).toHaveBeenCalledWith({ key, name, allowed })
  })
})

describe('setupEnumField', () => {
  it('adds "is" methods for allowed values', () => {
    // given
    const key = 'sport'
    const name = 'current'
    const allowed = ['pushups', 'pullups']
    cut.sport = {}
    // when
    cut.setupEnumField({ key, name, allowed })

    // then
    expect(cut.sport.current.is.pushups).toEqual(expect.any(Function))
    expect(cut.sport.current.is.pullups).toEqual(expect.any(Function))
  })
})

describe('buildAddData', () => {
  beforeEach(() => {
    cut.stringOperator = jest.fn(() => 'bar')
  })
  afterEach(() => {
    cut.stringOperator.mockRestore()
  })
  it('returns correct data', () => {
    // given
    const data = { foo: 'foo' }
    const add = {
      data: [
        { name: 'bar', value: 'bar.bar' },
        { name: 'baz', value: 'baz.baz' },
      ],
    }

    // when
    const result = cut.buildAddData({ data, add })

    // then
    expect(result).toEqual({ foo: 'foo', bar: 'bar', baz: 'bar' })
  })
})

describe('stringOperator', () => {
  const expected = 'expected'
  beforeEach(() => {
    cut.foo = { bar: { value: jest.fn(() => expected) } }
  })
  it('calls right method', () => {
    // given
    const value = 'foo.bar'

    // when
    const result = cut.stringOperator(value)

    // then
    expect(result).toEqual(expected)
  })
})
