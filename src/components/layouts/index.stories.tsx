import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import Layout from '.'

export default {
  component: Layout,
  args: { children: 'button' },
} as Meta<typeof Layout>

type Story = StoryObj<typeof Layout>

export const Default: Story = { ...SPStory }

export const PC: Story = { ...PCStory }
