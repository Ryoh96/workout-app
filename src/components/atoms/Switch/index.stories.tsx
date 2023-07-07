import type { Meta, StoryObj } from '@storybook/react'

import Switch from '.'

export default {
  component: Switch,
} as Meta<typeof Switch>

type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Checked: Story = { args: { checked: true } }
