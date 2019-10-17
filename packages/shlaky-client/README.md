# shlaky


```
localStorageKeys: ['task']
```
this.managers.localStorage.get.task()
this.managers.localStorage.set.task(task)
this.managers.localStorage.remove.task()

```
routes: ['/', '/tasks']
```
this.managers.routing.to.home()
this.managers.routing.is.home()
this.managers.routing.get.home()
this.managers.routing.to.tasks()
this.managers.routing.is.tasks()
this.managers.routing.get.tasks()

```
resources: [{
  key: 'users',
  fields: [
    { fieldKey: 'age', type: 'number'},
    { fieldKey: 'isAwesome', type: 'bool' }
    { fieldKey: 'role', type: 'enum', allowed: ['admin', 'user'] }
  ],
}]
```
facade.users.populate()
facade.users.all()
facade.users.one(id)
facade.users.destroy(id)
facade.users.add(user)
facade.users.isEmpty()
facade.users.populateIsLoading()
facade.users.populateIsLoaded()
facade.users.populateHasError()
facade.users.addIsLoading()
facade.users.addIsLoaded()
facade.users.addHasError()
this.stores.users.add()
this.stores.users.all()
this.stores.users.populate()
this.managers.api.users.add(users)
this.managers.api.users.all()
this.managers.api.users.one(id)
this.managers.api.users.update(id, data)
this.managers.api.users.destroy(id)
this.helpers.endpoints.users.add()
this.helpers.endpoints.users.add()
this.helpers.endpoints.users.all()
this.helpers.endpoints.users.one(id)
this.helpers.endpoints.users.update(id)
this.helpers.endpoints.users.destroy(id)

##### the users key also auto creates currentUser stuff:
this.managers.localStorage.get.currentUser()
this.managers.localStorage.set.currentUser(user)
this.managers.localStorage.remove.currentUser()
this.managers.api.auth.login(credentials)
this.managers.api.auth.signup(user)
this.managers.api.auth.logout()
this.helpers.endpoints.auth.login()
this.helpers.endpoints.auth.signup()

```
states: [{
  key: 'sport',
  fields: [{ fieldKey: 'current', type: 'enum', allowed: [PUSHUPS, PULLUPS],
  initial: PULLUPS }]
}]
```
facade.sport.value()
facade.sport.set(value)
facade.sport.is.pushups()
facade.sport.is.pullups()


Api Manager
===

setCurretUser: Sets the auth token to be sent with headers for all future requests
