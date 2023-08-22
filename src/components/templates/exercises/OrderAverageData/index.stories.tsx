import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import { handleGetAllTrainingsInNote } from '@/graphql/schema/queries/training/getAllTrainingsInNote/msw'
import { client } from '@/pages/_app'
import { SPStory, TABStory } from '@/tests/storybook'

import Component from '.'

export default {
  component: Component,
  args: {
    id: 'hoge',
  },
  decorators: [
    (story) => (
      <>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
      </>
    ),
  ],
  parameters: {
    msw: {
      handlers: [handleGetAllTrainingsInNote()],
    },
  },
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {
  ...SPStory,
}

export const AnotherValue: Story = {
  args: {
    id: 'boo',
  },
  ...SPStory,
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [handleGetAllTrainingsInNote({ status: 200 })],
    },
    ...SPStory,
  },
}

export const NoData: Story = {
  args: {
    id: 'dummy',
  },
  ...SPStory,
}
