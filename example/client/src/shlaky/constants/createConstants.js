import * as states from './states.constants'

const createConstants = ({ overrides = {} }) => {
  return {
    ...states,
    ...overrides,
  }
}

export default createConstants
