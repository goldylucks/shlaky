import ResourceService from './Resource.service'

const createServices = dependencies => {
  const resource = new ResourceService(dependencies)

  return {
    resource,
  }
}

export default createServices
