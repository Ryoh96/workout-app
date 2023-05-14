import type { Meta, StoryObj } from '@storybook/react'

import HorizontalTable from '@/components/molecules/HorizontalTable'
import type { Round } from '@/graphql/generated/resolvers-types'
import { SPStory } from '@/tests/storybook'
import type { DeepPartial } from '@/types/utils'
import makeRoundsSummary from '@/utils/makeRoundsSummary'

import Accordion from '.'

export default {
  component: Accordion,
  args: {
    title: 'Accordion',
    children: (
      <ul>
        <li>item1</li>
        <li>item2</li>
      </ul>
    ),
  },
} as Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Default: Story = { ...SPStory }

const rounds: DeepPartial<Round>[] = [
  {
    setCount: 1,
    weight: 30,
    repetition: 10,
    interval: 90,
    unit: 'KG',
  },
  {
    setCount: 2,
    weight: 30,
    repetition: 9,
    interval: 90,
    unit: 'KG',
  },
  {
    setCount: 3,
    weight: 25,
    repetition: 8,
    unit: 'KG',
  },
]

const summary = makeRoundsSummary(rounds)

export const HasTag: Story = {
  args: {
    title: '5月30日(水)',
    children: (
      <ul>
        <li>item1</li>
        <li>item2</li>
      </ul>
    ),
    tags: ['胸', '二頭'],
  },
  ...SPStory,
}

export const HasTable: Story = {
  args: {
    title: 'Title',
    children: <HorizontalTable rounds={summary} />,
  },
  ...SPStory,
}

export const HasTableWithTitle: Story = {
  args: {
    title: 'Title',
    children: <HorizontalTable title="ダンベルベンチプレス" rounds={summary} />,
  },
  ...SPStory,
}

export const HasTablesWithTitle: Story = {
  args: {
    title: 'Title',
    children: (
      <div className="divide-y-2 divide-gray-100 space-y-8">
        <>
          {[...Array(3)].map((_, index) => (
            <div className="pt-4 first:pt-0" key={index}>
              <HorizontalTable title="ダンベルベンチプレス" rounds={summary} />
            </div>
          ))}
        </>
      </div>
    ),
    ...SPStory,
  },
}
