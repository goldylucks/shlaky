import FileManager from './File.manager'
import TemplateManager from './Template.manager'

const createManagers = dependencies => {
  const file = new FileManager(dependencies)
  const template = new TemplateManager(dependencies)

  return {
    file,
    template,
  }
}

export default createManagers
