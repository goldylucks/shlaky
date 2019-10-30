import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ExternalLink from './ExternalLink'

export const actions = {
  onClick: action('onClick'),
}

storiesOf('ExternalLink', module).add('default', () => (
  <ExternalLink {...actions} href="//google.com">
    Google
  </ExternalLink>
))
