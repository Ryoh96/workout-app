import type { Preview } from '@storybook/react'
import '../src/styles/globals.css'
import { initialize, mswDecorator } from 'msw-storybook-addon'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [mswDecorator]
initialize()

export default preview
