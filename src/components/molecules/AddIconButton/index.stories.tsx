import type { Meta, StoryObj } from '@storybook/react'

import AddIconButton from '.'

export default {
  component: AddIconButton,
  args: { children: 'button' },
} as Meta<typeof AddIconButton>

type Story = StoryObj<typeof AddIconButton>

export const Default: Story = {}

export const WithText: Story = {
  args: {
    text: '新規作成',
  },
}
