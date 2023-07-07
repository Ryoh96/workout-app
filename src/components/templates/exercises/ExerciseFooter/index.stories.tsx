import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import ExerciseFooter from '.'

export default {
  component: ExerciseFooter,
  ...SPStory,
} as Meta<typeof ExerciseFooter>

type Story = StoryObj<typeof ExerciseFooter>

export const Default: Story = {}
