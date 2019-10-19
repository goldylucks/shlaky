"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Middleware = _interopRequireDefault(require("./Middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-params */
class AuthMiddleware extends _Middleware.default {
  constructor(...args) {
    super(...args);

    this.protect = async (req, res, next) => {
      const bearer = req.headers.authorization;

      if (!bearer || !bearer.startsWith('Bearer ')) {
        res.status(401).send({
          message: 'authorization header is needed'
        });
        return;
      }

      const token = bearer.split('Bearer ')[1].trim();
      let payload;

      try {
        payload = await this.utils.auth.verifyToken(token);
      } catch (error) {
        res.status(401).send({
          message: 'error verifying token',
          error
        });
        return;
      }

      const {
        item,
        error
      } = await this.services.resource.users.getOne(payload.id);

      if (error) {
        res.status(401).send({
          message: 'error finding user with that token',
          error
        });
        return;
      }

      if (!item) {
        res.status(401).send({
          message: 'error finding user with that token'
        });
        return;
      }

      req.user = item;
      next();
    };
  }

}

var _default = AuthMiddleware;
exports.default = _default;