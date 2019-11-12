const CREATE = 'create'
const READ = 'read'
const UPDATE = 'update'
const DESTROY = 'destroy'

const crudConstants = {
  CREATE,
  READ,
  UPDATE,
  DESTROY,
  ALL: [CREATE, READ, UPDATE, DESTROY],
}

export default crudConstants
