import type { Meta, StoryObj } from '@storybook/react'

import { SPStory, TABStory } from '@/tests/storybook'
import { fixture } from '@/utils/exercise/getNormalizedStatData/fixture'
import getRoundsAverage from '@/utils/exercise/getRoundsAverage'

import { Presentational } from '.'

export default {
  component: Presentational,
  args: {
    averages: getRoundsAverage(fixture),
  },
  ...SPStory,
} as Meta<typeof Presentational>

type Story = StoryObj<typeof Presentational>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const NoData: Story = {
  args: {
    averages: getRoundsAverage([]),
  },
}
