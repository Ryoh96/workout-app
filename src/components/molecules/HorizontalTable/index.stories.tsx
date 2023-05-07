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

const roundsWithMemo = [
  {
    setCount: 1,
    weight: 30,
    repetition: 10,
    interval: 90,
    memo: {
      content: '腰を上げてデクライン気味にする。肩甲骨を寄せる。',
    },
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
    interval: 90,
    memo: {
      content: '腰に負担がかからないように気をつける',
    },
  },
]

const summary = makeRoundsSummary(rounds)
const summaryWithMemo = makeRoundsSummary(roundsWithMemo)

export default {
  component: HorizontalTable,
  args: { rounds: summary },
} as Meta<typeof HorizontalTable>

type Story = StoryObj<typeof HorizontalTable>

export const Default: Story = { ...SPStory }

export const WithTitle: Story = {
  args: { title: 'タイトル', rounds: summary },
  ...SPStory,
}
export const WithMemo: Story = {
  args: { title: 'タイトル', rounds: summaryWithMemo },
  ...SPStory,
}

export const PC: Story = { ...PCStory }
