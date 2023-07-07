import type { Meta, StoryObj } from '@storybook/react'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { SPStory } from '@/tests/storybook'

import TrainingFooter from '.'

export default {
  component: TrainingFooter,
  args: {
    noteData: note.note,
  },
  ...SPStory,
} as Meta<typeof TrainingFooter>

type Story = StoryObj<typeof TrainingFooter>

export const Default: Story = {}
