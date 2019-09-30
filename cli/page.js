const fs = require('fs')
const path = require('path')

const name = 'Auth'
const destination = path.join(
  process.cwd(),
  'src',
  'pages',
  `${name}.page.jsx`
)

run()

function run() {
  const html = generateHtml()
  writeFile(html)
  logSuccess()
}

function generateHtml() {
  return `import React from 'react'
import PropTypes from 'prop-types'
import { withShlaky } from 'shlaky'

class ${name}Page extends React.Component {
  render() {
    return (
      <div className={classes.root}>
        ${name} Page!
      </div>
    )
  }
}

const styles = () => ({
  root: {},
})

${name}Page.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withShlaky(${name}Page, { styles })`
}

function writeFile(html) {
  fs.writeFileSync(destination, html)
}

function logSuccess() {
  global.console.log(`Successfully written to\n${destination}`)
}
