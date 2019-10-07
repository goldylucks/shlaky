import BootingMeta from './Booting.meta'
import RenderingMeta from './Rendering.meta'

const createMetas = ({ config, dependencies, overrides = {} }) => {
  const booting = new BootingMeta({ dependencies, overrides, config })
  const rendering = new RenderingMeta({ dependencies, overrides, config })
  return {
    booting,
    rendering,
  }
}

export default createMetas
