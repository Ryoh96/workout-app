import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { Props } from 'next/script'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleAddExercisesByPart } from '@/graphql/schema/mutations/exercise/addExerciseByPart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'
import type { ComboBoxOption } from '@/types'

import AddExerciseModal from '.'

const partsOptions = allPartsName.parts as ComboBoxOption[]

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [parts, setParts] = useState(partsOptions[0])

  const openModal = () => setIsOpen(true)
  return (
    <>
      <Button onClick={openModal}>Click</Button>
      <AddExerciseModal
        {...props}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCompleted={() => console.log('completed')}
        parts={parts}
        partsOptions={partsOptions}
      />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    noteData: note.note,
  },
  parameters: {
    msw: {
      handlers: [handleAddExercisesByPart()],
    },
    ...SPStory,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [handleAddExercisesByPart({ status: 200 })],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [handleAddExercisesByPart({ status: 500 })],
    },
  },
}
