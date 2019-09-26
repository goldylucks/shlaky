import ResourceService from './Resource.service'

const createServices = ({ config, dependencies, overrides = {} }) => {
  const resource = new ResourceService({ config, dependencies, overrides })
  return {
    resource,
    ...overrides,
  }
}

export default createServices
