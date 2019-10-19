"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController extends _Controller.default {
  constructor(...args) {
    super(...args);

    this.getOne = async (req, res) => {
      const {
        id
      } = req.params;
      const {
        item,
        error
      } = await this.services.resource.users.getOne(id);

      if (error) {
        global.console.error('[users.getOne] error', error);
        res.status(400).send({
          message: 'error finding user',
          error
        });
        return;
      }

      const user = item.formatToResponse();
      res.status(200).json({
        user
      });
    };

    this.getMany = async (req, res) => {
      const {
        collection,
        error
      } = await this.services.resource.users.getMany();

      if (error) {
        global.console.error('[users.getMany] error', error);
        res.status(400).send({
          message: 'error getting users',
          error
        });
        return;
      }

      const users = collection.map(item => item.formatToResponse());
      res.status(200).json({
        users
      });
    };

    this.me = async (req, res) => {
      const {
        item,
        error
      } = await this.services.resource.users.me(req.user._id);

      if (error) {
        global.console.error('[users.me] error', error);
        res.status(400).send({
          message: 'error finding current user',
          error
        });
        return;
      }

      const user = item.formatToResponse();
      res.status(200).json({
        user
      });
    };
  }

}

var _default = UsersController;
exports.default = _default;