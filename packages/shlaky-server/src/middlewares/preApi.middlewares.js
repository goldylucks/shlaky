import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

const preApiMiddlewares = [
  cors(),
  json(),
  urlencoded({ extended: true }),
  morgan('dev'),
]

export default preApiMiddlewares
