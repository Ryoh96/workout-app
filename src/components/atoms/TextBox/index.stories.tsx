import type { Meta, StoryObj } from '@storybook/react'

import TextBox from '.'

export default {
  component: TextBox,
} as Meta<typeof TextBox>

type Story = StoryObj<typeof TextBox>

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
