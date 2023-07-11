import type { Meta, StoryObj } from '@storybook/react'

import { exerciseNamesByParts } from '@/graphql/schema/queries/exricise/getExerciseNamesByPart/fixture'
import { maxTotalLoad } from '@/graphql/schema/queries/scalar/getMaxTotalLoad/fixture'
import { maxWeight } from '@/graphql/schema/queries/scalar/getMaxWeight/fixture'
import { SPStory, TABStory } from '@/tests/storybook'

import { Presentational } from '.'

const index = 0

const exercise = exerciseNamesByParts[0].part?.exercises?.[index]
const maxWeightData = maxWeight
const maxTotalLoadData = maxTotalLoad

export default {
  component: Presentational,
  args: {
    exercise,
    maxWeightData,
    maxWeightLoading: false,
    maxTotalLoadData,
    maxTotalLoadLoading: false,
    trainingNum: 10,
    lastDate: new Date().toISOString(),
    statLoading: false,
    index,
  },
  ...SPStory,
} as Meta<typeof Presentational>

type Story = StoryObj<typeof Presentational>

export const Default: Story = {}

export const LoadingAll: Story = {
  args: {
    statLoading: true,
  },
}

export const LoadingStat: Story = {
  args: {
    statLoading: true,
  },
}

export const NoData: Story = {
  args: {
    trainingNum: 0,
    lastDate: undefined,
  },
}

export const Tablet: Story = {
  ...TABStory,
}
