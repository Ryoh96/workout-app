import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import Toast from '@/components/atoms/Toast'
import type { GetNoteQuery } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import useNoteIdStore from '@/store/note/noteId'
import { client, setupMockServer } from '@/tests/jest'
import type { ComboBoxOption } from '@/types'
import { datetimeFormat } from '@/utils/dateFormat'

import SummarySection from '.'

const TestComponent = ({ noteData }: { noteData?: GetNoteQuery }) => {
  const setNoteId = useNoteIdStore((state) => state.setNoteId)
  setNoteId('dummy')

  return (
    <ApolloProvider client={client}>
      <SummarySection
        noteData={noteData}
        datetime={
          noteData
            ? datetimeFormat(new Date(noteData?.note!.createdAt), true)
            : ''
        }
      />
      <Toast />
    </ApolloProvider>
  )
}

describe('SummarySection', () => {
  it('should render props', async () => {
    const noteData = note
    render(<TestComponent noteData={noteData} />)
    expect(screen.getByText('要約')).toBeInTheDocument()
    expect(await screen.getByText(/作成時刻/)).toBeInTheDocument()

    const parts = new Set(
      note.note?.trainings?.flatMap((training) =>
        training.exercise?.parts?.map((p) => p.name)
      ) as string[]
    )

    parts.forEach((part) => expect(screen.getByText(part)).toBeInTheDocument())
  })
  it('should display no data', async () => {
    render(<TestComponent />)
    expect(screen.getByText('要約')).toBeInTheDocument()
    expect(await screen.getByText('ノートがありません')).toBeInTheDocument()
  })
})
