import type { Meta, StoryObj } from '@storybook/react'

import { SPStory, TABStory } from '@/tests/storybook'

import Header from '.'

export default {
  component: Header,
  args: { children: 'button' },
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const Default: Story = { ...SPStory }

export const PC: Story = { ...TABStory }
