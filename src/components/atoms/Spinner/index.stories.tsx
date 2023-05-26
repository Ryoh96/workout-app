import type { Meta, StoryObj } from '@storybook/react'

import Spinner from '.'

export default {
  component: Spinner,
} as Meta<typeof Spinner>

type Story = StoryObj<typeof Spinner>

export const Default: Story = {}
export const Small: Story = { args: { variant: 'small' } }
