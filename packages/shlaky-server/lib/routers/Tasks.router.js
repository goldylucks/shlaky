"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Router = _interopRequireDefault(require("./Router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TasksRouter extends _Router.default {
  setupInstance() {
    this.instance = (0, _express.Router)();
    this.instance.post('/', this.controllers.tasks.createOne);
    this.instance.get('/', this.controllers.tasks.getMany);
    this.instance.get('/:id', this.controllers.tasks.getOne);
    this.instance.put('/:id', this.controllers.tasks.updateOne);
    this.instance.delete('/:id', this.controllers.tasks.destroyOne);
  }

}

var _default = TasksRouter;
exports.default = _default;