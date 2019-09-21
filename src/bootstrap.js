import React from 'react'
import mobxLoggerEnableLogging from 'mobx-logger'
// eslint-disable-next-line import/no-extraneous-dependencies
import whyDidYouRender from '@welldone-software/why-did-you-render'

import './index.css'

// const SHOW_MOBX_LOGS = true // change to true for debugging
// const SHOW_WHY_DID_YOU_RENDER = true // change to true for debugging

if (typeof SHOW_MOBX_LOGS !== 'undefined') {
  mobxLoggerEnableLogging()
}

if (typeof SHOW_WHY_DID_YOU_RENDER !== 'undefined') {
  whyDidYouRender(React)
  React.Component.whyDidYouRender = true
}
