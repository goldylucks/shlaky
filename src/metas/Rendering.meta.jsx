import React from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx'

import Root from '../components/Root'

import Meta from './Meta'

let facadeInstanceId = 0

const RENDER_TO_ID = 'root'

class RenderingMeta extends Meta {
  constructor(dependencies) {
    super(dependencies)
    this.facadeInstance = observable(dependencies.facade)
    if (module.hot) {
      module.hot.addStatusHandler(status => {
        if (status === 'idle') {
          global.console.debug('[HMR] idle')
          facadeInstanceId += 1
          this.render()
        }
      })
    }
  }

  render = () => {
    this.reportRenderStart()
    ReactDOM.render(
      <Root facade={this.facadeInstance} facadeInstaceId={facadeInstanceId} />,
      document.getElementById(RENDER_TO_ID)
    )
    this.reportRenderEnd()
  }

  reportRenderStart = () => this.debug('Start')

  reportRenderEnd = () => this.debug('End')

  debug(...args) {
    global.console.debug('[Render]', ...args)
  }
}

export default RenderingMeta
