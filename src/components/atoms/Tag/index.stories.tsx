import type { Meta, StoryObj } from '@storybook/react'

import Tag from '.'

export default {
  component: Tag,
  args: { children: '二頭' },
} as Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

export const Default: Story = {}
