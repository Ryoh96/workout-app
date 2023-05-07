import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import Tag from '.'

export default {
  component: Tag,
  args: { children: 'tag' },
} as Meta<typeof Tag>

type Story = StoryObj<typeof Tag>

export const Default: Story = {}
