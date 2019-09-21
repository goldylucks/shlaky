import { createBrowserHistory } from 'history'
import { observable, decorate } from 'mobx'

const history = createBrowserHistory()

decorate(history, {
  location: observable,
})
export default history
