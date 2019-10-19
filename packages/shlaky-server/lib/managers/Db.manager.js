"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Manager = _interopRequireDefault(require("./Manager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DbManager extends _Manager.default {
  constructor(...args) {
    super(...args);
    this.keys = ['users', 'tasks'];

    this.setupResource = key => {
      this[key] = {
        getOne: id => this.getOne(id, {
          model: this.models[key].getInstance()
        }),
        getMany: () => this.getMany({
          model: this.models[key].getInstance()
        }),
        createOne: data => this.createOne({
          model: this.models[key].getInstance(),
          data
        }),
        updateOne: (id, data) => this.updateOne(id, {
          model: this.models[key].getInstance(),
          data
        }),
        destroyOne: id => this.destroyOne(id, {
          model: this.models[key].getInstance()
        })
      };
    };

    this.connect = (url = this.config.dbUrl, options = {}) => {
      return _mongoose.default.connect(url, { ...options,
        useNewUrlParser: true
      });
    };

    this.getOne = async (id, {
      model
    }) => {
      try {
        const item = await model.findById(id);
        return {
          item
        };
      } catch (error) {
        console.error(`[db.getOne] ${model.collection.name} with id ${id}`, error);
        return {
          error,
          item: {}
        };
      }
    };

    this.getMany = async ({
      model
    }) => {
      try {
        const collection = await model.find();
        return {
          collection
        };
      } catch (error) {
        console.error(`[db.getMany] ${model.collection.name}`);
        return {
          error,
          collection: []
        };
      }
    };

    this.createOne = async ({
      model,
      data
    }) => {
      try {
        const item = await model.create(data);
        return {
          item
        };
      } catch (error) {
        console.error(`[db.createOne] error ${model.collection.name} with data`, data);
        console.error(error);
        return {
          error,
          item: {}
        };
      }
    };

    this.updateOne = async (id, {
      model,
      data
    }) => {
      try {
        const item = await model.findByIdAndUpdate(id, data);

        if (!item) {
          console.error(`[db.updateOne] ${model.collection.name} with id ${id} not found`);
          return {
            error: new Error('not found'),
            item: {}
          };
        }

        return {
          item
        };
      } catch (error) {
        console.error(`[db.updateOne] ${model.collection.name} with id ${id}`, error);
        return {
          error,
          item: {}
        };
      }
    };

    this.destroyOne = async (id, {
      model
    }) => {
      try {
        const item = await model.findByIdAndRemove(id);

        if (!item) {
          console.error(`[db.destroyOne] ${model.collection.name} with id ${id} not found`);
          return {
            error: new Error('not found'),
            item: {}
          };
        }

        return {
          item
        };
      } catch (error) {
        console.error(`[db.updateOne] ${model.collection.name} with id ${id}`, error);
        return {
          error,
          item: {}
        };
      }
    };

    this.setup();
  }

  setup() {
    this.keys.forEach(this.setupResource);
  }

}

var _default = DbManager;
exports.default = _default;