import type { Meta, StoryObj } from '@storybook/react'

import { SPStory, TABStory } from '@/tests/storybook'

import AccordionList from '.'

const data = [
  {
    title: 'accordion1',
    content: (
      <ul>
        <li>content1-1</li>
        <li>content1-2</li>
      </ul>
    ),
  },
  {
    title: 'accordion2',
    content: (
      <ul>
        <li>content2-1</li>
        <li>content2-2</li>
      </ul>
    ),
  },
  {
    title: 'accordion3',
    content: (
      <ul>
        <li>content2-1</li>
        <li>content2-2</li>
      </ul>
    ),
  },
  {
    title: 'accordion4',
    content: (
      <ul>
        <li>content2-1</li>
        <li>content2-2</li>
      </ul>
    ),
  },
]

export default {
  component: AccordionList,
  args: {
    items: data,
  },
} as Meta<typeof AccordionList>

type Story = StoryObj<typeof AccordionList>

export const Default: Story = {
  ...SPStory,
}

export const Tablet: Story = {
  ...TABStory,
}

export const NoData: Story = {
  args: { items: [] },
  ...SPStory,
}
