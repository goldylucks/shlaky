global.Headers = class Headers {
  append() {
    jest.fn()
  }
}

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

// silence debug statements
global.console.debug = () => {}
