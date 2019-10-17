import Base from '../Base'

class Facade extends Base {
  constructor(dependencies) {
    super(dependencies)
    this.setupCrud()
  }

  setupCrud() {
    this.constants.crudKeys.ALL.forEach(this.setupCrudKey)
  }

  setupCrudKey = crudKey => {
    this[crudKey] = this.constants.types.ALL.reduce(
      this.registerCrudKeyReducer(crudKey),
      {}
    )
  }

  registerCrudKeyReducer = crudKey => (acc, type) => ({
    ...acc,
    [type]: ({ side, key }) =>
      this.services.crud.do({ side, key, type, crudKey }),
  })
}

export default Facade
