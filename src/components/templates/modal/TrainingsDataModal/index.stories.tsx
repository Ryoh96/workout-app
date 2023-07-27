import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'

import TrainingDataModal from '.'

type Props = ComponentProps<typeof TrainingDataModal>
const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <TrainingDataModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        noteData={props.noteData}
      />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    noteData: note,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const NoData: Story = {
  args: {
    noteData: undefined,
  },
}
