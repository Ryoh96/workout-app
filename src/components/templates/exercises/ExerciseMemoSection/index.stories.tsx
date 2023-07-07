import type { Meta, StoryObj } from '@storybook/react'

import {
  data,
  hasLongMemData,
} from '@/graphql/schema/queries/memo/getPinnedMemosByExercises/fixture'
import { SPStory } from '@/tests/storybook'

import { Presentational } from '.'

export default {
  component: Presentational,
  args: {
    data: data,
    loading: false,
    refetch: () => console.log('refetch'),
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
    data: undefined,
  },
}

export const HasLongMemo: Story = {
  args: {
    data: hasLongMemData,
  },
}
