import { Tasks } from './tasks.model'
import { crudControllers }  from '../../utils/crud'

const controllers = crudControllers(Tasks)

export default controllers
