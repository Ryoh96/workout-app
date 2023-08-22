import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import Toast from '@/components/atoms/Toast'
import { handleCreateTraining } from '@/graphql/schema/mutations/training/createTraining/mws'
import { handleGetExerciseNamesByPart } from '@/graphql/schema/queries/exricise/getExerciseNamesByPart/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import CreateTraining from '.'

const partsOptions = allPartsName.parts
const noteData = note

export default {
  component: CreateTraining,
  args: {
    onCompleted: () => console.log('completed'),
    partsOptions,
    existingTrainings: new Set(''),
  },
  decorators: [
    (story) => (
      <>
        <ApolloProvider client={client}>{story()}</ApolloProvider>
        <Toast />
      </>
    ),
  ],
  parameters: {
    msw: {
      handlers: [handleGetExerciseNamesByPart(), handleCreateTraining()],
    },
  },
} as Meta<typeof CreateTraining>

type Story = StoryObj<typeof CreateTraining>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [handleGetExerciseNamesByPart(), handleCreateTraining()],
    },
    viewport: {
      viewports: {
        iPhoneSE: {
          name: 'SP',
          styles: {
            width: '400px',
            height: '680px',
          },
        },
      },
      defaultViewport: 'iPhoneSE',
    },
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        handleGetExerciseNamesByPart({ status: 200, loadingInfinite: true }),
        handleCreateTraining(),
      ],
    },
    viewport: {
      viewports: {
        iPhoneSE: {
          name: 'SP',
          styles: {
            width: '400px',
            height: '680px',
          },
        },
      },
      defaultViewport: 'iPhoneSE',
    },
  },
}
