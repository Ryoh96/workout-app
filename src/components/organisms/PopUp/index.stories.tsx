import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import PopUp from '.'

export default {
  component: PopUp,
  args: {
    title: 'タイトル',
    children: 'コンテンツコンテンツ',
  },
} as Meta<typeof PopUp>

type Story = StoryObj<typeof PopUp>

export const Default: Story = {}
export const Small: Story = {
  args: {
    variant: 'small',
  },
}
