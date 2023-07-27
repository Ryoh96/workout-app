import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import { handleGetTotalLoadByNote } from '@/graphql/schema/queries/note/getTotalLoadByNote/msw'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import Section from '.'

const parts = allPartsName.parts

export default {
  component: Section,
  args: {
    parts: parts?.[0],
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
  parameters: {
    msw: {
      handlers: [handleGetTotalLoadByNote()],
    },
    ...SPStory,
  },
} as Meta<typeof Section>

type Story = StoryObj<typeof Section>

export const Default: Story = {
  ...SPStory,
}
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [handleGetTotalLoadByNote({ status: 200 })],
    },
  },
}
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleGetTotalLoadByNote({ status: 500 })],
    },
  },
}
