import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'

import Toast from '@/components/atoms/Toast'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { handleGetNoteMemo } from '@/graphql/schema/queries/note/getNoteMemo/msw'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'
import { dateFormat, datetimeFormat } from '@/utils/dateFormat'

import  Section  from '.'

const noteData = note

export default {
  component: Section,
  args: {
    noteData,
    datetime: datetimeFormat(new Date())
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
        handleGetNoteMemo(),
      ],
    },
    ...SPStory,
  },

} as Meta<typeof Section>


type Story = StoryObj<typeof Section>

export const Default: Story = {
    ...SPStory,
}

