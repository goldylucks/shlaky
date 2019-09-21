import React from 'react'

//import config from './config'

//import shlaky from './shlaky'

//shlaky.config({ config })

const rows = [
  { title: 'metas', columns: ['booting', 'rendering'] },
  { title: 'facade', columns: ['facade'] },
  {
    title: 'stores',
    columns: [
      'task',
      'tasks',
      'currentUser',
      'users',
      'surprise',
      'visualMode',
      'auth',
    ],
  }, // TODO separate resource store from state store
  { title: 'services', columns: ['resource'] },
  { title: 'managers', columns: ['api', 'localStorage', 'routing', 'cache'] },
  { title: 'helpers', columns: ['endpoints', 'apiValidations'] },
  {
    title: 'utils',
    columns: ['env', 'history', 'misc', 'logger', 'analytics'],
  },
  { title: 'constants', columns: ['misc', 'states'] }, // constants
]

const Row = ({ title, columns }) => (
  <div className="row">
    <div className="row-title">{title}</div>
    <div className="columns">
      {columns.map(column => (
        <Column key={column} column={column} />
      ))}
    </div>
  </div>
)

const Column = ({ column }) => (
  <div className="column">
    <p>{column}</p>
  </div>
)

const Dependencies = ({ config }) => (
  <div className="dependencies-root">
    {rows.map(row => (
      <Row key={row.title} {...row} />
    ))}
  </div>
)

export default Dependencies
