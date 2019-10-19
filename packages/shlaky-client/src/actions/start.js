import setup from './setup'

const start = (...args) => {
  const { metas, facade, utils } = setup(...args)
  metas.booting.boot().then(metas.rendering.render)

  if (utils.env.isDev()) {
    global.facade = facade
  }
}

export default start
