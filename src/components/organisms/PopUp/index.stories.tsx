import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import PopUp from '.'

export default {
  component: PopUp,
  args: {
    title: 'タイトル',
    children: 'コンテンツコンテンツ',
  },
  ...SPStory,
} as Meta<typeof PopUp>

type Story = StoryObj<typeof PopUp>

export const Default: Story = {}
export const Small: Story = {
  args: {
    variant: 'small',
  },
}
