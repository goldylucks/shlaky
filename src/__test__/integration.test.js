


describe('local storage', () => {
  test('defined for currentUser - derived from resources', () => {
    areFunctions([
      managers.localStorage.get.currentUser,
      managers.localStorage.set.currentUser,
      managers.localStorage.remove.currentUser,
    ])
  })

  test('defined for task - manually added', () => {
    areFunctions([
      managers.localStorage.get.task,
      managers.localStorage.set.task,
      managers.localStorage.remove.task,
    ])
  })
})

describe('routes', () => {
  test('defined for home - automatically', () => {
    areFunctions([
      managers.routing.to.home,
      managers.routing.is.home,
      managers.routing.get.home,
    ])
  })

  test('defined for tasks index - derived from resources', () => {
    areFunctions([
      managers.routing.to.tasks,
      managers.routing.is.tasks,
      managers.routing.get.tasks,
    ])
  })

  test('defined for tasks show - derived from resources', () => {
    areFunctions([
      managers.routing.to.task,
      managers.routing.is.task,
      managers.routing.get.task,
    ])
  })

  test('defined for surprise - manually added', () => {
    areFunctions([
      managers.routing.to.surprise,
      managers.routing.is.surprise,
      managers.routing.get.surprise,
    ])
  })
})

describe('facade', () => {
  test('defined for users - derived from resources', () => {
    areFunctions([
      facade.users.populate,
      facade.users.all,
      facade.users.one,
      facade.users.destroy,
      facade.users.add,
      facade.users.isEmtpy,
      racade.users.populateIsLoading,
      facade.users.populateIsLoaded,
      facade.users.populateHasError,
      facade.users.addIsLoading,
      facade.users.addIsLoaded,
      facade.users.addHasError,
    ])
  })

  describe('routing', () => {
    test('defined for home', () => {
      areFunctions([
        facade.routing.get.home,
        facade.routing.is.home,
        facade.routing.to.home,
      ])
    })

    test('defined for tasks index - derived from resources', () => {
      areFunctions([
        facade.routing.get.tasks,
        facade.routing.is.tasks,
        facade.routing.to.tasks,
      ])
    })
    
    test('defined for tasks show - derived from resources', () => {
      areFunctions([
        facade.routing.get.task,
        facade.routing.is.task,
        facade.routing.to.task,
      ])
    })

    test('defined for profile - derived from resources', () => {
      areFunctions([
        facade.routing.get.profile,
        facade.routing.is.profile,
        facade.routing.to.profile,
      ])
    })
  })
})

describe('resources', () => {
  test('are defined on facade', () => {})

  test('are defined on stores', () => {
    areFunctions([stores.users.add, stores.users.all, stores.users.populate])
  })

  test('are defined on api manager', () => {
    areFunctions([
      this.managers.api.users.add,
      this.managers.api.users.all,
      this.managers.api.users.one,
      this.managers.api.users.update,
      this.managers.api.users.destroy,
    ])
  })

  test('are defined on endpoints helper', () => {
    areFunctions([
      helpers.endpoints.users.add,
      helpers.endpoints.users.all,
      helpers.endpoints.users.one,
    ])
  })
})

test('states are defined', () => {
  areFunctions([
    facade.visualMode.value,
    facade.visualMode.set,
    facade.visualMode.is.light,
    facade.visualMode.is.dark,
  ])
})

// HELPERS
function isFunction(func) {
  expect(func).toEqual(expect.any(Function))
}

function areFunctions(funcs) {
  funcs.forEach(isFunction)
}
