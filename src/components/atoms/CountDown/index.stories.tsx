import type { Meta, StoryObj } from '@storybook/react'

import CountDown from '.'

export default {
  component: CountDown,
  args: {
    initialTime: 10,
  },
} as Meta<typeof CountDown>

type Story = StoryObj<typeof CountDown>

export const Default: Story = {}
