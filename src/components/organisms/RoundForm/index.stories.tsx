import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import RoundForm from '.'

export default {
  component: RoundForm,
} as Meta<typeof RoundForm>

type Story = StoryObj<typeof RoundForm>

export const Default: Story = {}
