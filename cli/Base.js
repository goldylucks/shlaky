class Base {
  constructor(dependencies) {
    object.assign(this, ...dependencies)
  }
}

export default Base

