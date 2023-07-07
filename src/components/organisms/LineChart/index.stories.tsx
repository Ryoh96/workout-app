import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import { LineChart } from '.'

const datasets = [
  {
    label: 'hoge',
    data: [10, 30, 20, 40],
  },
]

const labels = [...Array(datasets[0].data.length)].map(() => '')

export default {
  component: LineChart,
  args: {
    datasets,
    labels,
  },
  ...SPStory,
} as Meta<typeof LineChart>

type Story = StoryObj<typeof LineChart>

export const Default: Story = {
  args: {},
}

export const SomeData: Story = {
  args: {
    datasets: [
      {
        label: 'hoge',
        data: [10, 30, 20, 40],
      },
      {
        label: 'fuga',
        data: [5, 15, 30, 20],
      },
    ],
  },
}
