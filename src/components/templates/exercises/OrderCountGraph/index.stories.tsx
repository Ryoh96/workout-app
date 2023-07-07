import type { Meta, StoryObj } from '@storybook/react'

import { datasets, labels } from '@/components/organisms/PieChart/index.stories'
import { SPStory, TABStory } from '@/tests/storybook'

import { Presentational } from '.'

export default {
  component: Presentational,
  args: {
    span: 3,
    datasets,
    labels,
  },
  ...SPStory,
} as Meta<typeof Presentational>

type Story = StoryObj<typeof Presentational>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    trainingsLoading: true,
  },
}

export const NoData: Story = {
  args: {
    datasets: [{ label: 'count', data: [] }],
  },
}
