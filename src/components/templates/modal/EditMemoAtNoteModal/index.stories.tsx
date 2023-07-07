import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { handleGetNoteMemo } from '@/graphql/schema/queries/note/getNoteMemo/msw'
import { client } from '@/pages/_app'
import { noteIdState } from '@/recoil/Note/noteId'
import { SPStory } from '@/tests/storybook'

import EditMemoAtNote from '.'

type Props = ComponentProps<typeof EditMemoAtNote> & { id: string }

const id = note.note?.id as string
const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const setIdState = useSetRecoilState(noteIdState)
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
      handlers: [handleGetNoteMemo()],
    },
    ...SPStory,
  },
  decorators: [
    (story) => (
      <RecoilRoot>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
      </RecoilRoot>
    ),
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
      handlers: [handleGetNoteMemo({ status: 200 })],
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
