"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Util = _interopRequireDefault(require("./Util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthUtil extends _Util.default {
  constructor(...args) {
    super(...args);

    this.newToken = user => _jsonwebtoken.default.sign({
      id: user.id
    }, this.config.jwtSecret, {
      expiresIn: this.config.jwtExpiresIn
    });

    this.verifyToken = token => new Promise((resolve, reject) => {
      _jsonwebtoken.default.verify(token, this.config.jwtSecret, (error, payload) => {
        if (error) {
          return reject(error);
        }

        resolve(payload);
      });
    });
  }

}

var _default = AuthUtil;
exports.default = _default;