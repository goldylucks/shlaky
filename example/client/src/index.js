import axios from 'axios'

import { start } from 'shlaky-client'
import config from './config'
import App from './App'

const overrides = { App }
start({ config, overrides, axios })

if (module.hot) {
  module.hot.accept()
}
