import Util from './Util'

class StringUtil extends Util {
  capitalizeFirstLetter(page) {
    return page[0].toUpperCase() + page.substr(1)
  }
}

export default StringUtil
