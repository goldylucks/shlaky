"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mobx = require("mobx");

var _mobxReact = require("mobx-react");

var _withStyles = _interopRequireDefault(require("@material-ui/styles/withStyles"));

var _facadeContext = _interopRequireDefault(require("../facade/facadeContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint import/no-extraneous-dependencies: 0 */
function withShlaky(WrappedComponent, {
  styles
} = {}) {
  var _class;

  let WithShlaky = (0, _mobxReact.observer)(_class = class WithShlaky extends WrappedComponent {
    constructor(props, context) {
      super(props, context);
      this.attachProperties(props, context);
    }

    attachProperties(props, context) {
      if (WrappedComponent.prototype.facade) {
        return;
      }

      const facade = context.value;
      const properties = {
        facade,
        routing: facade.routing,
        constants: facade.constants
      };

      if (facade.supportsCurrentUser) {
        properties.auth = facade.auth;
        properties.currentUser = facade.currentUser;
        properties.users = facade.users;
      }

      facade.config.resources.forEach(({
        key
      }) => {
        properties[key] = facade[key];
      });
      facade.config.states.forEach(({
        key
      }) => {
        properties[key] = facade[key];
      });
      (0, _mobx.extendObservable)(WrappedComponent.prototype, properties);
    }

    render() {
      return WrappedComponent.prototype.render.call(this);
    }

  }) || _class;

  WithShlaky.contextType = _facadeContext.default;
  WithShlaky.displayName = `WithShlaky(${getDisplayName(WrappedComponent)})`;
  return styles ? (0, _withStyles.default)(styles)(WithShlaky) : WithShlaky;
}

var _default = withShlaky;
exports.default = _default;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}