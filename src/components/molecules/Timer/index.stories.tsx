import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import Timer from '.'

export default {
  component: Timer,
} as Meta<typeof Timer>

type Story = StoryObj<typeof Timer>

export const Default: Story = { ...SPStory }
