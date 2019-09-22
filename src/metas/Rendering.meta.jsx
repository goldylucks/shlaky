/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx'

import Root from '../components/Root'

import Meta from './Meta'

let facadeInstanceId = 0

const RENDER_TO_ID = 'root'

class RenderingMeta extends Meta {
  constructor({ config, dependencies, overrides }) {
    super({ config, dependencies, overrides })
    this.App = overrides.App || 'Our App!'
    this.facadeInstance = observable.box(dependencies.facade)
    if (module.hot) {
      this.handleHMR()
    }
  }

  render = () => {
    this.reportRenderStart()
    ReactDOM.render(
      <Root
        App={this.App}
        facade={this.facadeInstance}
        facadeInstaceId={facadeInstanceId}
      />,
      document.getElementById(RENDER_TO_ID)
    )
    this.reportRenderEnd()
  }

  handleHMR() {
    module.hot.addStatusHandler(status => {
      if (status === 'idle') {
        global.console.debug('[HMR] idle')
        facadeInstanceId += 1
        this.render()
      }
    })
  }

  reportRenderStart = () => this.debug('Start')

  reportRenderEnd = () => this.debug('End')

  debug(...args) {
    global.console.debug('[Render]', ...args)
  }
}

export default RenderingMeta
