import type { Meta, StoryObj } from '@storybook/react'

import { unitOptions } from '@/constants'
import { PCStory, SPStory } from '@/tests/storybook'

import SwitchWithLabel from '.'

export default {
  component: SwitchWithLabel,
  args: { options: unitOptions },
} as Meta<typeof SwitchWithLabel>

type Story = StoryObj<typeof SwitchWithLabel>

export const Default: Story = { args: { label: 'ラベル' } }

export const HiddenLabel: Story = {
  args: { label: 'ラベル', labelVisible: false },
}
