"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _mobx = require("mobx");

var _Root = _interopRequireDefault(require("../components/Root"));

var _Meta = _interopRequireDefault(require("./Meta"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */
let facadeInstanceId = 0;
const RENDER_TO_ID = 'root';

class RenderingMeta extends _Meta.default {
  constructor({
    config,
    dependencies,
    overrides
  }) {
    super({
      config,
      dependencies,
      overrides
    });

    this.render = () => {
      this.reportRenderStart();

      _reactDom.default.render(_react.default.createElement(_Root.default, {
        App: this.App,
        facade: this.facadeInstance,
        facadeInstaceId: facadeInstanceId
      }), document.getElementById(RENDER_TO_ID));

      this.reportRenderEnd();
    };

    this.reportRenderStart = () => this.debug('Start');

    this.reportRenderEnd = () => this.debug('End');

    this.App = overrides.App || 'Our App!';
    this.facadeInstance = _mobx.observable.box(dependencies.facade);

    if (module.hot) {
      this.handleHMR();
    }
  }

  handleHMR() {
    module.hot.addStatusHandler(status => {
      if (status === 'idle') {
        global.console.debug('[HMR] idle');
        facadeInstanceId += 1;
        this.render();
      }
    });
  }

  debug(...args) {
    global.console.debug('[Render]', ...args);
  }

}

var _default = RenderingMeta;
exports.default = _default;