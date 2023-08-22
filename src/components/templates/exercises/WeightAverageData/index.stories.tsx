import type { Meta, StoryObj } from '@storybook/react'

import { SPStory, TABStory } from '@/tests/storybook'
import {
  fixture,
  noDataFixture,
} from '@/utils/exercise/getNormalizedStatData/fixture'
import getRoundsAverage from '@/utils/exercise/getRoundsAverage'

import Component from '.'

export default {
  component: Component,
  args: {
    normalizedStatData: fixture,
    loading: false,
  },
  ...SPStory,
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const NoData: Story = {
  args: {
    normalizedStatData: noDataFixture,
  },
}
