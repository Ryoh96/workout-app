import type { Meta, StoryObj } from '@storybook/react'

import { exerciseNamesByParts } from '@/graphql/schema/queries/exricise/getExerciseNamesByPart/fixture'
import { maxTotalLoad } from '@/graphql/schema/queries/scalar/getMaxTotalLoad/fixture'
import { maxWeight } from '@/graphql/schema/queries/scalar/getMaxWeight/fixture'
import { SPStory, TABStory } from '@/tests/storybook'

import Component from '.'

const index = 0

const exercise = exerciseNamesByParts[0].part?.exercises?.[index]
const maxWeightData = maxWeight
const maxTotalLoadData = maxTotalLoad

export default {
  component: Component,
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
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}

export const Tablet: Story = {
  ...TABStory,
}
