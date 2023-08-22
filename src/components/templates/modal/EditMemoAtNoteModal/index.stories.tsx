import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleDeleteMemoAtNote } from '@/graphql/schema/mutations/note/deleteMemoAtNote/msw'
import { handleUpsertMemoAtNote } from '@/graphql/schema/mutations/note/upsertMemoAtNote/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { handleGetNoteMemo } from '@/graphql/schema/queries/note/getNoteMemo/msw'
import { client } from '@/pages/_app'
import useNoteIdStore from '@/store/note/noteId'
import { SPStory } from '@/tests/storybook'

import EditMemoAtNote from '.'

type Props = ComponentProps<typeof EditMemoAtNote> & { id: string }

const id = note.note?.id as string
const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const setIdState = useNoteIdStore((state) => state.setNoteId)
  setIdState(props.id)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <EditMemoAtNote isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    id,
  },
  parameters: {
    msw: {
      handlers: [
        handleGetNoteMemo(),
        handleUpsertMemoAtNote(),
        handleDeleteMemoAtNote(),
      ],
    },
    ...SPStory,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const DoesNotHaveNote: Story = {
  args: {
    id: undefined,
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        handleUpsertMemoAtNote({ status: 200, loadingInfinite: true }),
        handleDeleteMemoAtNote({ status: 200, loadingInfinite: true }),
        handleGetNoteMemo(),
      ],
    },
    ...SPStory,
  },
}

export const HasError: Story = {
  parameters: {
    msw: {
      handlers: [handleGetNoteMemo({ status: 500 })],
    },
    ...SPStory,
  },
}
