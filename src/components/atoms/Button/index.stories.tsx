import type { Meta, StoryObj } from '@storybook/react'

import Button from '.'

export default {
  component: Button,
  args: { children: 'button' },
} as Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Important: Story = {
  args: { variant: "important"},
}
