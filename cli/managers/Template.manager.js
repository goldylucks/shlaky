import getPageTemplate from '../templates/page.template'
import getServiceTemplate from '../templates/service.template'

import Manager from './Manager'

class TemplateManager extends Manager {
  get({ key, type }) {
    if (type === this.constants.types.PAGE) {
      const pageName = this.utils.string.capitalizeFirstLetter(key)
      return getPageTemplate(pageName)
    }

    if (type === this.constants.types.SERVICE) {
      const serviceName = this.utils.string.capitalizeFirstLetter(key)
      return getServiceTemplate(serviceName)
    }
  }
}

export default TemplateManager
