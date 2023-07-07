import type { Meta, StoryObj } from '@storybook/react'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { SPStory } from '@/tests/storybook'

import SetAlerm from '.'

export default {
  component: SetAlerm,
  args: {
    noteData: note.note,
  },
  ...SPStory,
} as Meta<typeof SetAlerm>

type Story = StoryObj<typeof SetAlerm>

export const Default: Story = {}
