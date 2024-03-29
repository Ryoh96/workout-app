import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { client } from '@/pages/_app'

import ExerciseFilterModal from '.'

type Props = {
  hasRound: boolean
}

const TestComponent = ({ hasRound }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [span, setSpan] = useState(10)
  const [round, setRound] = useState(3)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      {hasRound ? (
        <ExerciseFilterModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          span={span}
          setSpan={setSpan}
          round={round}
          setRound={setRound}
        />
      ) : (
        <ExerciseFilterModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          span={span}
          setSpan={setSpan}
        />
      )}
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    hasRound: true,
  },
  decorators: [
    (story) => <ApolloProvider client={client}>{story()}</ApolloProvider>,
  ],
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const DoesNotHaveRound: Story = {
  args: {
    hasRound: false,
  },
}
