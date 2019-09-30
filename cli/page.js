const fs = require('fs')
const path = require('path')

run()

function run() {
  const pages = process.argv.slice(2).map(capitalize)
  pages.forEach(generatePage)
}

function generatePage(PageName) {
  const html = generateHtml(PageName)
  writeFile(html, PageName)
  logSuccess(PageName)
}

function generateHtml(PageName) {
  return `import React from 'react'
import PropTypes from 'prop-types'
import { withShlaky } from 'shlaky'

class ${PageName}Page extends React.Component {
  render() {
    return (
      <div className={classes.root}>
        ${PageName} Page!
      </div>
    )
  }
}

const styles = () => ({
  root: {},
})

${PageName}Page.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withShlaky(${PageName}Page, { styles })`
}

function writeFile(html, PageName) {
  fs.writeFileSync(destination(PageName), html)
}

function destination(PageName) {
  return path.join(process.cwd(), 'src', 'pages', `${PageName}.page.jsx`)
}

function logSuccess(PageName) {
  global.console.log(destination(PageName))
}

function capitalize(page) {
  return page[0].toUpperCase() + page.substr(1)
}
