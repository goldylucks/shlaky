const getPageTemplate = pageName => `import React from 'react'
import PropTypes from 'prop-types'
import { withShlaky } from 'shlaky'

class ${pageName}Page extends React.Component {
  render() {
    return (
      <div className={classes.root}>
        ${pageName} Page!
      </div>
    )
  }
}

const styles = () => ({
  root: {},
})

${pageName}Page.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withShlaky(${pageName}Page, { styles })`

export default getPageTemplate
