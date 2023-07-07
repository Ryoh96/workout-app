import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import RoundForm from '.'

export default {
  component: RoundForm,
  ...SPStory,
} as Meta<typeof RoundForm>

type Story = StoryObj<typeof RoundForm>

export const Default: Story = {}
