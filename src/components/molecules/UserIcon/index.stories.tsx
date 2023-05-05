import type { Meta, StoryObj } from '@storybook/react'

import UserIcon from '.'

export default {
  component: UserIcon,
  args: { src: '/rabbit.jpg', isLogin: true },
} as Meta<typeof UserIcon>

type Story = StoryObj<typeof UserIcon>

export const Default: Story = {}

export const NoIcon: Story = {
  args: { isLogin: true, src: undefined },
}

export const NotLogin: Story = {
  args: { isLogin: false },
}
