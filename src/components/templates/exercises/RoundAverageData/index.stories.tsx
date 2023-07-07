import type { Meta, StoryObj } from '@storybook/react'

import { SPStory, TABStory } from '@/tests/storybook'

import { Presentational } from '.'

export default {
  component: Presentational,
  args: {
    roundCountAverage: 3,
    loading: false,
  },
  ...SPStory,
} as Meta<typeof Presentational>

type Story = StoryObj<typeof Presentational>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
