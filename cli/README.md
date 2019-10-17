```bash
$ yarn shlaky create resource service # both client and server
$ yarn shlaky create resource service for client
$ yarn shlaky create resource service for server
```

# As a npm package
```js
// create resource service
import { facade } from 'shlaky-cli'
facade.create.service({ side: facade.constants.sides.CLIENT, key: 'localStorage' })
```

# Args & types
* non typescript or flow related
```js
side: 'client' | 'server' | 'both' | 'cli'
type: 'constants' | 'util '| 'helper' |  'model' | 'manager' | 'service' | 'middleware' | 'controller' | 'router' | 'meta' | 'store' | 'state' | 'page' | 'component'
crudKey: 'create' | 'read' | 'update' | 'destroy'
key: String // name of what we are creating, i.e. "resource", "localStorage" etc
```
