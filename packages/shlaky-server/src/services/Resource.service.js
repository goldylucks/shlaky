import Service from './Service'

class ResourceService extends Service {
  users = {
    getOne: id => this.managers.db.users.getOne(id),
    getMany: () => this.managers.db.users.getMany(),
  }
}

export default ResourceService
