"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Service = _interopRequireDefault(require("./Service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResourceService extends _Service.default {
  constructor(...args) {
    super(...args);
    this.users = {
      createOne: data => this.managers.db.users.createOne(data),
      getOne: id => this.managers.db.users.getOne(id),
      getMany: () => this.managers.db.users.getMany(),
      me: id => this.managers.db.users.getOne(id)
    };
    this.tasks = {
      createOne: data => this.managers.db.tasks.createOne(data),
      getOne: id => this.managers.db.tasks.getOne(id),
      getMany: () => this.managers.db.tasks.getMany(),
      updateOne: (id, data) => this.managers.db.tasks.updateOne(id, data),
      destroyOne: id => this.managers.db.tasks.destroyOne(id)
    };
  }

}

var _default = ResourceService;
exports.default = _default;