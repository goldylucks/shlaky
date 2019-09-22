import setup from './setup'

const start = ({ config, dependencies, overrides }) => {
  const { metas, facade, utils } = setup({ config, dependencies, overrides })
  metas.booting.boot().then(metas.rendering.render)

  if (utils.env.isDev()) {
    global.facade = facade
  }
}

export default start
