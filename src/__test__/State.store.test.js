import { toJS } from 'mobx'

import StateStore from '../State.store'

let cut

const config = {
  states: {
    state: {
      fields: [
        {
          name: 'field1',
          type: 'enum',
          allowed: ['value11', 'value12'],
          initial: 'value11',
        },
        {
          name: 'field2',
          type: 'enum',
          allowed: ['value21', 'value22'],
          initial: 'value22',
        },
      ],
    },
  },
}

beforeEach(() => {
  cut = new StateStore({ config })
})

describe('setup', () => {
  beforeEach(() => {
    cut.setupField = jest.fn()
  })
  afterEach(() => {
    cut.setupField.mockRestore()
  })

  it('calls setup field', () => {
    // when
    cut.setup()
    // then
    expect(cut.setupField).toHaveBeenCalledTimes(2)
  })
})

describe('setupField', () => {
  beforeEach(() => {
    cut.setupEnumField = jest.fn()
  })
  afterEach(() => {
    cut.setupEnumField.mockRestore()
  })
  it('defines this.field and calls setupEnumField', () => {
    // given
    const name = 'foo'
    const type = 'enum'
    const allowed = ['bar']
    const initial = 'baz'

    // when
    cut.setupField({ name, type, allowed, initial })

    // then
    expect(toJS(cut.foo)).toEqual(initial)
    expect(cut.setupEnumField).toHaveBeenCalledTimes(1)
    expect(cut.setupEnumField).toHaveBeenCalledWith({ name, allowed })
  })
})

describe('setupEnumField', () => {
  it('setups methods for enum field', () => {
    const name = 'foo'
    const allowed = ['bar', 'baz']
    // when
    cut.setupEnumField({ name, allowed })

    // then
    expect(cut.fooIsBar).toEqual(expect.any(Function))
    expect(cut.fooIsBaz).toEqual(expect.any(Function))
    expect(cut.getFoo).toEqual(expect.any(Function))
    expect(cut.setFoo).toEqual(expect.any(Function))

    // when
    cut.setFoo('baz')

    // then
    expect(cut.getFoo()).toBe('baz')
  })
})
