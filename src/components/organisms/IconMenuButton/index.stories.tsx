import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import IconMenuButton from '.'

export default {
  component: IconMenuButton,
  ...SPStory,
} as Meta<typeof IconMenuButton>

type Story = StoryObj<typeof IconMenuButton>

export const Default: Story = {
  args: {
    isLogin: true,
  },
}
export const IsNotLogin: Story = {
  args: {
    isLogin: false,
  },
}
