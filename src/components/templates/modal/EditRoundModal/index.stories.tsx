import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import type { Round } from '@/graphql/generated/operations-type'
import { handleEditRound } from '@/graphql/schema/mutations/round/editRoundInput/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { editRoundModalState } from '@/recoil/Modal/EditRoundModal'
import { editRoundState } from '@/recoil/Round/editRound'
import { SPStory } from '@/tests/storybook'

import EditRoundModal from '.'

type Props = ComponentProps<typeof EditRoundModal> & {
  isOpenEditRoundModal: boolean
  editRound: Partial<Round>
}

const TestComponent = (props: Props) => {
  const setIsOpenEditRoundModal = useSetRecoilState(editRoundModalState)
  setIsOpenEditRoundModal(props.isOpenEditRoundModal)
  const setEditedRound = useSetRecoilState(editRoundState)
  setEditedRound(props.editRound)
  return (
    <>
      <Button onClick={() => setIsOpenEditRoundModal(true)}>Click</Button>
      <EditRoundModal onCompleted={() => console.log('complete')} />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    isOpenEditRoundModal: false,
  },
  parameters: {
    msw: {
      handlers: [handleEditRound()],
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

export const Default: Story = {
  args: {
    editRound: {
      id: 'ce36f791-d054-4076-9457-bb08f7d9614',
    },
  },
}

export const EditMode: Story = {
  args: {
    editRound: note.note?.trainings?.[0].rounds?.[0] as Round,
  },
}

export const Loading: Story = {
  args: {
    editRound: note.note?.trainings?.[0].rounds?.[0] as Round,
  },
  parameters: {
    msw: {
      handlers: [handleEditRound({ status: 200 })],
    },
  },
}
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleEditRound({ status: 500 })],
    },
  },
}
