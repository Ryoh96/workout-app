import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import SelectBox from '.'

export default {
  component: SelectBox,
} as Meta<typeof SelectBox>

type Story = StoryObj<typeof SelectBox>

export const Default: Story = {
  args: {
    content: '30',
    unit: '回',
  },
}

export const HasIntro: Story = {
  args: {
    intro: '約',
    content: '30',
    unit: '秒',
  },
}
