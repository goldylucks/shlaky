"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Db = _interopRequireDefault(require("./Db.manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createManagers = dependencies => {
  const db = new _Db.default(dependencies);
  return {
    db
  };
};

var _default = createManagers;
exports.default = _default;