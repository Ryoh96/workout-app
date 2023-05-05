import type { Meta, StoryObj } from '@storybook/react'

import UserIconMenu from '.'

export default {
  component: UserIconMenu,
  args: { src: '/rabbit.jpg', isLogin: true },
} as Meta<typeof UserIconMenu>

type Story = StoryObj<typeof UserIconMenu>

export const Default: Story = {}

export const NotLogin: Story = {
  args: { isLogin: false },
}
