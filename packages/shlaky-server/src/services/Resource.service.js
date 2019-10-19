import Service from './Service'

class ResourceService extends Service {
  users = {
    createOne: data => this.managers.db.users.createOne(data),
    getOne: id => this.managers.db.users.getOne(id),
    getMany: () => this.managers.db.users.getMany(),
    me: id => this.managers.db.users.getOne(id),
  }

  tasks = {
    createOne: data => this.managers.db.tasks.createOne(data),
    getOne: id => this.managers.db.tasks.getOne(id),
    getMany: () => this.managers.db.tasks.getMany(),
    updateOne: (id, data) => this.managers.db.tasks.updateOne(id, data),
    destroyOne: id => this.managers.db.tasks.destroyOne(id),
  }
}

export default ResourceService
