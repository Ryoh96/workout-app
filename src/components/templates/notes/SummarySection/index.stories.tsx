import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import Toast from '@/components/atoms/Toast'
import type { GetNoteQuery } from '@/graphql/generated/operations-csr'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import useNoteIdStore from '@/store/note/noteId'
import { SPStory } from '@/tests/storybook'
import { datetimeFormat } from '@/utils/dateFormat'

import SummarySection from '.'

const noteData = note

const TestComponent = (props: { noteData: GetNoteQuery | undefined }) => {
  const setNoteId = useNoteIdStore((state) => state.setNoteId)
  setNoteId(props.noteData?.note!.id ?? null)

  return (
    <SummarySection
      noteData={props.noteData}
      datetime={
        props.noteData
          ? datetimeFormat(new Date(props.noteData?.note!.createdAt), true)
          : ''
      }
    />
  )
}

export default {
  component: TestComponent,
  args: {
    noteData,
  },
  decorators: [
    (story) => (
      <>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
        <Toast />
      </>
    ),
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {
  ...SPStory,
}

export const NoData: Story = {
  args: {
    noteData: undefined,
  },
  ...SPStory,
}
