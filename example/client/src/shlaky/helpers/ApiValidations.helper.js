import Helper from './Helper'

class ApiValidationsHelper extends Helper {
  registerValidateResponseFor = ({ url, data, config } = {}) => response => {
    if (!this.isBadResponse(response)) {
      global.console.debug('[API] response', response)
      return response
    }
    this.reportBadResponse({ url, data, config, response })

    throw new Error('bad response from API')
  }

  isBadResponse(response) {
    return (
      !response ||
      response.data === undefined ||
      response.data === null ||
      Number.isNaN(response.data)
    )
  }

  reportBadResponse({ url, data, config, response }) {
    window.console.group('[API]: bad response')
    window.console.error(
      'url:',
      url,
      '\n',
      'data',
      data,
      '\n',
      'config',
      config,
      '\n',
      'response',
      response
    )
    window.console.groupEnd()
  }

  reportError({ url, config, error }) {
    window.console.group('[API]: error')
    window.console.error(
      'url:',
      url,
      '\n',
      'config',
      config,
      '\n',
      'error',
      error
    )
    window.console.groupEnd()
  }
}

export default ApiValidationsHelper
