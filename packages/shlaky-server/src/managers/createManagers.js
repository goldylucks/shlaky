import DbManager from './Db.manager'

const createManagers = dependencies => {
  const db = new DbManager(dependencies)

  return {
    db,
  }
}

export default createManagers
