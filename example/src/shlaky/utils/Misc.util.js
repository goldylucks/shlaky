/* eslint import/no-extraneous-dependencies: 0 */

import uuidv5 from 'uuid/v5'

import Util from './Util'

class MiscUtil extends Util {
  randomId = () => uuidv5(this.config.domain, uuidv5.DNS)
}

export default MiscUtil
