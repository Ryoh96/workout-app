import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import type { Exercise } from '@/graphql/generated/operations-type'
import { handleDeleteExercise } from '@/graphql/schema/mutations/exercise/deleteExercise/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { deleteExerciseModalState } from '@/recoil/Modal/DeleteExerciseModal'
import { SPStory } from '@/tests/storybook'

import DeleteExerciseModal from '.'

type Props = ComponentProps<typeof DeleteExerciseModal> & { isOpen: boolean }

const exercise = note.note?.trainings?.[0].exercise as Exercise

const TestComponent = (props: Props) => {
  const setIsOpen = useSetRecoilState(deleteExerciseModalState)
  const openModal = () => setIsOpen(true)

  return (
    <>
      <Button onClick={openModal}>Click</Button>
      <DeleteExerciseModal
        onCompleted={() => console.log('completed')}
        deleteId="hoge"
      />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    isOpen: false,
  },
  parameters: {
    msw: {
      handlers: [handleDeleteExercise()],
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

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [handleDeleteExercise({ status: 200 })],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleDeleteExercise({ status: 500 })],
    },
  },
}
