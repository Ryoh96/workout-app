import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import SwitchWithLabel from '.'

export default {
  component: SwitchWithLabel,
} as Meta<typeof SwitchWithLabel>

type Story = StoryObj<typeof SwitchWithLabel>

export const Default: Story = { args: { label: 'ラベル' } }

export const Checked: Story = { args: { label: 'ラベル', checked: true } }

export const HiddenLabel: Story = {
  args: { label: 'ラベル', checked: false, labelVisible: false },
}
