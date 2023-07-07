import { BookmarkIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import CheckedIconWithLabel from '.'

export default {
  component: CheckedIconWithLabel,
  args: {
    icon: <BookmarkIcon className="" />,
    label: '固定',
  },
} as Meta<typeof CheckedIconWithLabel>

type Story = StoryObj<typeof CheckedIconWithLabel>

export const Default: Story = {}

export const Checked: Story = { args: { checked: true } }
