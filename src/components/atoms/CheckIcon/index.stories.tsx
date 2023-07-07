import { BookmarkIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'

import CheckIcon from '.'

export default {
  component: CheckIcon,
  args: {
    icon: <BookmarkIcon className="" />,
  },
} as Meta<typeof CheckIcon>

type Story = StoryObj<typeof CheckIcon>

export const Default: Story = {}

export const Checked: Story = { args: { checked: true } }
