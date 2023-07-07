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
  ...SPStory,
} as Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Default: Story = { ...SPStory }

const rounds: DeepPartial<Round>[] = [
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
}

export const HasTable: Story = {
  args: {
    title: 'Title',
    children: <HorizontalTable data={summary} />,
  },
}

export const HasTableWithTitle: Story = {
  args: {
    title: 'Title',
    children: <HorizontalTable title="ダンベルベンチプレス" data={summary} />,
  },
}

export const HasTablesWithTitle: Story = {
  args: {
    title: 'Title',
    children: (
      <div className="divide-y-2 divide-gray-100 space-y-8">
        <>
          {[...Array(3)].map((_, index) => (
            <div className="pt-4 first:pt-0" key={index}>
              <HorizontalTable title="ダンベルベンチプレス" data={summary} />
            </div>
          ))}
        </>
      </div>
    ),
  },
}
