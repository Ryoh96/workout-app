import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import TextArea from '.'

export default {
  component: TextArea,
} as Meta<typeof TextArea>

type Story = StoryObj<typeof TextArea>

export const Default: Story = {}

export const HasValue: Story = {
  args: {
    value: 'テキスト',
  },
}

export const HasPlaceholder: Story = {
  args: {
    placeholder: '入力してください',
  },
}

export const IsError: Story = {
  args: {
    isError: true,
  },
}
