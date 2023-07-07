import { PlusIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'

import IconButton from '.'

export default {
  component: IconButton,
  args: {
    icon: <PlusIcon className="w-5 h-5" />,
  },
} as Meta<typeof IconButton>

type Story = StoryObj<typeof IconButton>

export const Default: Story = {}

export const HasText: Story = {
  args: {
    text: '追加',
  },
}
