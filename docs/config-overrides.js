const {
  override,
  useBabelRc,
  addWebpackPlugin,
  addWebpackAlias,
} = require('customize-cra') // eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = override(
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom',
  }),
  useBabelRc(),
  addWebpackPlugin(new WebpackNotifierPlugin({ excludeWarnings: true }))
)
