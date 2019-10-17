import Service from './Service'

class CrudService extends Service {
  do({ side, key, crudKey, type }) {
    if (crudKey === this.constants.crudKeys.CREATE) {
      this.create({ side, key, type })
    } else if (crudKey === this.constants.crudKeys.READ) {
      this.read({ side, key, type })
    } else if (crudKey === this.constants.crudKeys.UPDATE) {
      this.update({ side, key, type })
    } else if (crudKey === this.constants.crudKeys.DESTROY) {
      this.destroy({ side, key, type })
    }
  }

  create({ side, key, type }) {
    const {
      clientTemplate,
      serverTemplate,
      cliTemplate,
    } = this.managers.template.get({
      key,
      type,
    })
    if (side === this.constants.sides.SERVER) {
      this.createForServer({ key, type, template: serverTemplate })
      return
    }
    if (side === this.constants.sides.CLIENT) {
      this.createForClient({ key, type, template: clientTemplate })
      return
    }
    if (side === this.constants.sides.BOTH) {
      this.createForServer({ key, type, template: serverTemplate })
      this.createForClient({ key, type, template: clientTemplate })
      return
    }
    if (side === this.constants.sides.CLI) {
      this.createForCli({ key, type, template: cliTemplate })
    }
  }

  createForServer({ key, type, template }) {
    this.managers.file.create({
      key,
      type,
      side: this.constants.sides.SERVER,
      template,
    })
  }

  createForClient({ key, type, template }) {
    this.managers.file.create({
      key,
      type,
      side: this.constants.sides.CLIENT,
      template,
    })
  }

  read({ side, key, type }) {
    if (side === this.constants.sides.SERVER) {
      this.readFromServer({ key, type })
    } else if (side === this.constants.sides.CLIENT) {
      this.readFromClient({ key, type })
    } else {
      this.readFromServer({ key, type })
      this.readFromClient({ key, type })
    }
  }

  readFromServer({ key, type }) {
    this.managers.file.read({ key, type, side: this.constants.sides.SERVER })
  }

  readFromClient({ key, type }) {
    this.managers.file.read({ key, type, side: this.constants.sides.CLIENT })
  }

  update() {
    global.console.log(
      'If you find a use for this method, please open an issue with it!'
    )
  }

  destroy({ side, key, type }) {
    if (side === this.constants.sides.SERVER) {
      this.destroyFromServer({ key, type })
    } else if (side === this.constants.sides.CLIENT) {
      this.destroyFromClient({ key, type })
    } else {
      this.destroyFromServer({ key, type })
      this.destroyFromClient({ key, type })
    }
  }

  destroyFromServer({ key, type }) {
    this.managers.file.destroy({ key, type, side: this.constants.sides.SERVER })
  }

  destroyFromClient({ key, type }) {
    this.managers.file.destroy({ key, type, side: this.constants.sides.CLIENT })
  }
}

export default CrudService
