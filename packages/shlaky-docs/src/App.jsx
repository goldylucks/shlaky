import React from 'react'

import Dependencies from './Dependencies'
import config from './config'

function App() {
  return (
    <div className="App">
      <Dependencies config={config} />
    </div>
  )
}

export default App
