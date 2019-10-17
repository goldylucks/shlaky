import fs from 'fs'
import path from 'path'

import Manager from './Manager'

class FileManager extends Manager {
  basePath = path.join(__dirname, '..')

  create({ side, key, type, template }) {
    const filePath = this.getFilePath({ side, key, type })
    fs.writeFileSync(filePath, template)
  }

  read({ side, key, type }) {
    const filePath = this.getFilePath({ side, key, type })
    return fs.readFileSync(filePath)
  }

  update({ side, key, type, updatedFile }) {
    const filePath = this.getFilePath({ side, key, type })
    return fs.writFileSync(filePath, updatedFile)
  }

  destroy({ side, key, type }) {
    const filePath = this.getFilePath({ side, key, type })
    return fs.unlinkSync(filePath)
  }

  getFilePath({ side, key, type }) {
    return path.join(this.basePath, side, type, key, '.js')
  }
}

export default FileManager
