"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TasksController extends _Controller.default {
  constructor(...args) {
    super(...args);

    this.createOne = async (req, res) => {
      const data = req.body;
      const {
        item,
        error
      } = await this.services.resource.tasks.createOne(data);

      if (error) {
        global.console.error('[tasks.createOne] error', error);
        res.status(400).send({
          message: 'error creating task',
          error
        });
        return;
      }

      res.status(201).json({
        task: item
      });
    };

    this.getOne = async (req, res) => {
      const {
        item,
        error
      } = await this.services.resource.tasks.getOne(req.params.id);

      if (error) {
        global.console.error('[tasks.getOne] error', error);
        res.status(400).send({
          message: 'error finding task',
          error
        });
        return;
      }

      res.status(200).json({
        task: item
      });
    };

    this.getMany = async (req, res) => {
      const {
        collection,
        error
      } = await this.services.resource.tasks.getMany();

      if (error) {
        global.console.error('[tasks.getMany] error', error);
        res.status(400).send({
          message: 'error getting tasks',
          error
        });
        return;
      }

      res.status(200).json({
        tasks: collection
      });
    };

    this.updateOne = async (req, res) => {
      const {
        id
      } = req.params;
      const data = req.body;
      const {
        item,
        error
      } = await this.services.resource.tasks.updateOne(id, data);

      if (error) {
        global.console.error('[tasks.createOne] error', error);
        res.status(400).send({
          message: 'error creating task',
          error
        });
        return;
      }

      res.status(201).json({
        task: item
      });
    };

    this.destroyOne = async (req, res) => {
      const {
        id
      } = req.params;
      const {
        error
      } = await this.services.resource.tasks.destroyOne(id);

      if (error) {
        global.consoe.error('[tasks.destroyOne] error', error);
        res.status(400).send({
          message: 'error destroying task',
          error
        });
        return;
      }

      res.status(200).send({
        message: 'deleted'
      });
    };
  }

}

var _default = TasksController;
exports.default = _default;