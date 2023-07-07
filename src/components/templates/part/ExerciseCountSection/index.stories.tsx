import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'

import { handleExerciseNameByNote } from '@/graphql/schema/queries/note/getExerciseNameByNote/msw'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import  Section  from '.'

const parts = allPartsName.parts

export default {
  component: Section,
  args: {
    parts: parts?.[0]
  },
    decorators: [
    (story) => (
      <RecoilRoot>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
      </RecoilRoot>
    ),
  ],
    parameters: {
    msw: {
      handlers: [
        handleExerciseNameByNote(),
      ],
    },
    ...SPStory
  },
} as Meta<typeof Section>


type Story = StoryObj<typeof Section>

export const Default: Story = {
    ...SPStory,
}
export const Loading: Story = {
    parameters: {
    msw: {
      handlers: [
        handleExerciseNameByNote({status: 200}),
      ],
    },
  },
}
export const Error: Story = {
    parameters: {
    msw: {
      handlers: [
        handleExerciseNameByNote({status: 500}),
      ],
    },
  },
}

