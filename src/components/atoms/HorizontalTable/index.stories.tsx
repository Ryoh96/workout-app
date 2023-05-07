import type { Meta, StoryObj } from '@storybook/react'

import makeRoundsSummary from '@/components/utils/makeRoundsSummary'
import { PCStory, SPStory } from '@/tests/storybook'

import HorizontalTable from '.'

const rounds = [
  {
    setCount: 1,
    weight: 30,
    repetition: 10,
    interval: 90,
  },
  {
    setCount: 2,
    weight: 30,
    repetition: 9,
    interval: 90,
  },
  {
    setCount: 3,
    weight: 25,
    repetition: 8,
  },
]

const summary = makeRoundsSummary(rounds)

export default {
  component: HorizontalTable,
  args: { array: summary },
} as Meta<typeof HorizontalTable>

type Story = StoryObj<typeof HorizontalTable>

export const Default: Story = { ...SPStory }

export const WithTitle: Story = {
  args: { title: 'タイトル', array: summary },
  ...SPStory,
}

export const PC: Story = { ...PCStory }
