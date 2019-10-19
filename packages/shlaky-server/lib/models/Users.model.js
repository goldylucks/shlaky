"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _Model = _interopRequireDefault(require("./Model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersModel extends _Model.default {
  constructor(...args) {
    super(...args);
    this.instance = void 0;
    this.schema = void 0;

    this.registerFormatToResponse = ({
      utils
    }) => function formatToResponse() {
      return { ...this.toJSON(),
        password: undefined,
        token: utils.auth.newToken(this)
      };
    };

    this.setupInstance();
  }

  setupInstance() {
    this.schema = this.getSchema();
    this.schema.pre('save', this.preSave);
    this.schema.methods.checkPassword = this.checkPassword;
    this.schema.methods.formatToResponse = this.registerFormatToResponse({
      utils: this.utils
    });
    this.instance = _mongoose.default.model('users', this.schema);
  }

  getSchema() {
    return new _mongoose.default.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      }
    }, {
      timestamps: true
    });
  }

  preSave(next) {
    if (!this.isModified('password')) {
      return next();
    }

    _bcrypt.default.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err);
      }

      this.password = hash;
      next();
    });
  }

  checkPassword(password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
      _bcrypt.default.compare(password, passwordHash, (err, same) => {
        if (err) {
          return reject(err);
        }

        resolve(same);
      });
    });
  }

}

var _default = UsersModel;
exports.default = _default;