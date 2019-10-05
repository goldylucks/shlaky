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

    this.setup = () => {
      this.config.resources.forEach(this.setupResource);
    };

    this.setupResource = resource => {
      this.setupBasicCrud(resource);
    };

    this.setup();
  }

  setupBasicCrud({
    key
  }) {
    this[key] = Object.assign(this[key] || {}, {
      add: (...args) => this.managers.api[key].add(...args),
      all: (...args) => this.managers.api[key].all(...args),
      one: (...args) => this.managers.api[key].one(...args),
      update: (...args) => this.managers.api[key].update(...args),
      destroy: (...args) => this.managers.api[key].destroy(...args)
    });
  }

}

var _default = ResourceService;
exports.default = _default;