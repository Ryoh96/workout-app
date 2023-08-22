import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import Toast from '@/components/atoms/Toast'
import type { GetNoteQuery } from '@/graphql/generated/operations-csr'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { handleGetPreviousTrainings } from '@/graphql/schema/queries/training/getPreviousTrainings/msw'
import { client, setupMockServer } from '@/tests/jest'

import TrainingDataModal from '.'

const user = userEvent.setup()
const server = setupMockServer(handleGetPreviousTrainings())
type Props = {
  noteData: GetNoteQuery | undefined
}

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ApolloProvider client={client}>
      <button onClick={() => setIsOpen(true)} data-testid="openModal">
        Click
      </button>
      <TrainingDataModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        noteData={props.noteData}
      />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

describe('TrainingDataModal', () => {
  it('should render props', async () => {
    render(<TestComponent noteData={note} />)
    await openModal()
    expect(screen.getByText('この日のデータ')).toBeInTheDocument()
    expect(await screen.findByText('ノート作成時刻')).toBeInTheDocument()
    expect(screen.getByText('部位ごとのデータ')).toBeInTheDocument()
  })

  it('should display no data', async () => {
    render(<TestComponent noteData={undefined} />)
    await openModal()
    expect(screen.getByText('この日のデータ')).toBeInTheDocument()
    expect(screen.getByText('データがありません')).toBeInTheDocument()
  })
})
