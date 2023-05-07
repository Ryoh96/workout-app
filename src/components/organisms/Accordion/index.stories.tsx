import type { Meta, StoryObj } from '@storybook/react'

import HorizontalTable from '@/components/molecules/HorizontalTable'
import makeRoundsSummary from '@/components/utils/makeRoundsSummary'
import { SPStory } from '@/tests/storybook'

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
