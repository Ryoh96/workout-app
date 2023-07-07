import { ClockIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'

import Title from '.'

export default {
  component: Title,
  args: {
    children: 'タイトル',
    icon: <ClockIcon />,
  },
} as Meta<typeof Title>

type Story = StoryObj<typeof Title>

export const H1: Story = {
  args: {
    as: 'h1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
  },
}
