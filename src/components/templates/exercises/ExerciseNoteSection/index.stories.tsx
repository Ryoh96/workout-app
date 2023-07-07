import type { Meta, StoryObj } from '@storybook/react'

import { SPStory, TABStory } from '@/tests/storybook'
import { fixture } from '@/utils/exercise/getNormalizedStatData/fixture'

import Section from '.'

export default {
  component: Section,
  args: {
    normalizedData: fixture,
  },
  ...SPStory,
} as Meta<typeof Section>

type Story = StoryObj<typeof Section>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const NoData: Story = {
  args: {
    normalizedData: [],
  },
}

export const Tablet: Story = {
  ...TABStory,
}
