"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Model = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TasksModel extends _Model.default {
  constructor(...args) {
    super(...args);
    this.instance = void 0;
    this.schema = void 0;
    this.setupInstance();
  }

  setupInstance() {
    this.schema = this.getSchema();
    this.instance = _mongoose.default.model('tasks', this.schema);
  }

  getSchema() {
    return new _mongoose.default.Schema({
      title: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      isDone: {
        type: Boolean,
        required: true,
        default: false
      }
    }, {
      timestamps: true
    });
  }

}

var _default = TasksModel;
exports.default = _default;