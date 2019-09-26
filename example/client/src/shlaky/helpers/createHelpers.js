import EndpointsHelper from './Endpoints.helper'
import ApiValidationsHelper from './ApiValidations.helper'

const createHelpers = ({ config, dependencies, overrides = {} }) => {
  const endpoints = new EndpointsHelper({ config, dependencies, overrides })
  const apiValidations = new ApiValidationsHelper({
    config,
    dependencies,
    overrides,
  })
  return {
    endpoints,
    apiValidations,
    ...overrides,
  }
}

export default createHelpers
