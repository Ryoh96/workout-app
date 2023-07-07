import type { Meta, StoryObj } from '@storybook/react'

import { SPStory, TABStory } from '@/tests/storybook'

import Footer from '.'

export default {
  component: Footer,
  args: { children: 'button' },
} as Meta<typeof Footer>

type Story = StoryObj<typeof Footer>

export const Default: Story = { ...SPStory }

export const PC: Story = { ...TABStory }
