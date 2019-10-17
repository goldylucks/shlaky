import CrudService from './Crud.service'

const createServices = dependencies => {
  const crud = new CrudService(dependencies)

  return {
    crud,
  }
}

export default createServices
