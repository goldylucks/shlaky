"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Base = _interopRequireDefault(require("../Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Router extends _Base.default {
  constructor(...args) {
    super(...args);
    this.instance = void 0;
  }

  getInstance() {
    if (!this.instance) {
      this.setupInstance();
    }

    return this.instance;
  }

  setupInstance() {
    const key = this._key;
    this.instance = (0, _express.Router)();
    this.instance.post('/', this.controllers[key].createOne);
    this.instance.get('/', this.controllers[key].getMany);
    this.instance.get('/:id', this.controllers[key].getOne);
    this.instance.put('/:id', this.controllers[key].updateOne);
    this.instance.delete('/:id', this.controllers[key].destroyOne);
  }

}

var _default = Router;
exports.default = _default;