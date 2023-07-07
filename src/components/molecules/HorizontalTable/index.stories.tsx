import type { Meta, StoryObj } from '@storybook/react'
import type { DeepPartial } from 'react-hook-form'

import type { Round } from '@/graphql/generated/resolvers-types'
import { SPStory } from '@/tests/storybook'
import makeRoundsSummary from '@/utils/makeRoundsSummary'

import HorizontalTable from '.'

const rounds = [
  {
    weight: 30,
    repetition: 10,
    interval: 90,
    unit: 'KG',
  },
  {
    weight: 30,
    repetition: 9,
    interval: 90,
    unit: 'KG',
  },
  {
    weight: 25,
    repetition: 8,
    unit: 'LB',
  },
] as DeepPartial<Round>[]

const roundsWithMemo = [
  {
    weight: 30,
    repetition: 10,
    interval: 90,
    unit: 'KG',
    memo: {
      content: '腰を上げてデクライン気味にする。肩甲骨を寄せる。',
    },
  },
  {
    weight: 30,
    repetition: 9,
    interval: 90,
    unit: 'KG',
  },
  {
    weight: 25,
    repetition: 8,
    interval: 90,
    unit: 'KG',
    memo: {
      content: '腰に負担がかからないように気をつける',
    },
  },
] as DeepPartial<Round>[]

const summary = makeRoundsSummary(rounds)
const summaryWithMemo = makeRoundsSummary(roundsWithMemo)

export default {
  component: HorizontalTable,
  args: { data: summary },
} as Meta<typeof HorizontalTable>

type Story = StoryObj<typeof HorizontalTable>

export const Default: Story = { ...SPStory }

export const WithTitle: Story = {
  args: { title: 'タイトル', data: summary },
  ...SPStory,
}
export const WithMemo: Story = {
  args: { title: 'タイトル', data: summaryWithMemo },
  ...SPStory,
}
