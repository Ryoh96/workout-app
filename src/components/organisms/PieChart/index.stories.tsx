import type { Meta, StoryObj } from '@storybook/react'

import { SPStory } from '@/tests/storybook'

import PieChart from '.'

export const datasets = [
  {
    label: 'hoge',
    data: [10, 30, 20, 40],
  },
]

export const labels = [...Array(datasets[0].data.length)].map(
  (_, index) => `${index}`
)

export default {
  component: PieChart,
  args: {
    datasets,
    labels,
    trainingsLoading: false,
  },
  ...SPStory,
} as Meta<typeof PieChart>

type Story = StoryObj<typeof PieChart>

export const Default: Story = {}
