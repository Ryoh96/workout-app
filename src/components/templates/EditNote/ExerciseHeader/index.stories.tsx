import type { Meta, StoryObj } from '@storybook/react'

import { PCStory, SPStory } from '@/tests/storybook'

import ExerciseHeader from '.'

export default {
  component: ExerciseHeader,
  args: {
    name: 'ダンベルベンチプレス',
    totalLoad: 900,
    previousTotalLoad: 800,
  },
} as Meta<typeof ExerciseHeader>

type Story = StoryObj<typeof ExerciseHeader>

export const Default: Story = {}
