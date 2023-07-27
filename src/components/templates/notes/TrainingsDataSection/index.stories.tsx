import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'
import { datetimeFormat } from '@/utils/dateFormat'

import Section from '.'

const noteData = note

export default {
  component: Section,
  args: {
    noteData,
    datetime: datetimeFormat(new Date()),
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof Section>

type Story = StoryObj<typeof Section>

export const Default: Story = {
  ...SPStory,
}
