import Facade from './Facade'

const createFacade = ({ dependencies, overrides = {}, config }) => {
  const facade = new Facade({ dependencies, overrides, config })
  return facade
}

export default createFacade
