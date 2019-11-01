"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController extends _Controller.default {
  constructor(...args) {
    super(...args);
    this.invalidMessage = 'user or password are invalid';
    this.missingFieldsMessage = 'Email and password are needed';

    this.login = async (req, res) => {
      const {
        email,
        password
      } = req.body;

      if (!email || !password) {
        res.status(400).send({
          message: this.missingFieldsMessage
        });
        return;
      }

      const {
        item,
        error
      } = await this.services.resource.users.getOne({
        email
      });

      if (error) {
        res.status(400).send({
          message: 'There was an error, please try again',
          error
        });
        return;
      }

      if (!item) {
        res.status(401).send({
          message: this.invalidMessage
        });
        return;
      }

      const passwordMatches = await item.checkPassword(password);

      if (!passwordMatches) {
        res.status(401).send({
          message: this.invalidMessage
        });
        return;
      }

      const token = this.utils.auth.newToken(user);
      const user = {
        token,
        ...item.formatToResponse()
      };
      res.status(200).json({
        user
      });
    };

    this.signup = async (req, res) => {
      const {
        email,
        password
      } = req.body;

      if (!email || !password) {
        res.status(400).send({
          message: this.missingFieldsMessage
        });
        return;
      }

      const {
        item,
        error
      } = await this.services.resource.users.createOne({
        email,
        password
      });

      if (error) {
        res.status(400).send({
          message: 'There was an error, please try again',
          error
        });
        return;
      }

      const user = { ...item.formatToResponse()
      };
      user.token = this.utils.auth.newToken(user);
      res.status(201).json({
        user
      });
    };
  }

}

var _default = AuthController;
exports.default = _default;