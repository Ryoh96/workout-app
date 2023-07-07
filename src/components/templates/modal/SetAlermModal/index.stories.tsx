import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import { handleDeleteMemo } from '@/graphql/schema/mutations/memo/deleteMemo/msw'
import { handlePinOutMemo } from '@/graphql/schema/mutations/memo/pinOutMemo/msw'
import { handleGetPinnedMemos } from '@/graphql/schema/queries/memo/getPinnedMemosByExercises/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import SetAlarmModal from '.'

type Props = ComponentProps<typeof SetAlarmModal>

const TestComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <SetAlarmModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toast />
    </>
  )
}

export default {
  component: TestComponent,
  args: {
    isOpenPinOutMemoModal: false,
  },
  decorators: [
    (story) => (
      <RecoilRoot>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
      </RecoilRoot>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        handleDeleteMemo(),
        handleGetPinnedMemos(),
        handlePinOutMemo(),
      ],
    },
    ...SPStory,
  },
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}
