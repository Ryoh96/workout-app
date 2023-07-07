import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'

import type { Part, Training } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { noteMemo } from '@/graphql/schema/queries/note/getNoteMemo/fixture'
import { SPStory, TABStory } from '@/tests/storybook'

import { Presentational } from '.'

const data = noteMemo

export default {
  component: Presentational,
  args: {
    loading: false,
    data,
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

export const Tablet: Story = {
  ...TABStory,
}
