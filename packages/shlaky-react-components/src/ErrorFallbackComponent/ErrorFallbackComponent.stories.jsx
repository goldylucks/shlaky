import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ErrorFallbackComponent from './ErrorFallbackComponent'

export const actions = {
  onClick: action('onClick'),
}

storiesOf('ErrorFallbackComponent', module).add('default', () => (
  <ErrorFallbackComponent error={new Error('Story error')} {...actions} />
))
