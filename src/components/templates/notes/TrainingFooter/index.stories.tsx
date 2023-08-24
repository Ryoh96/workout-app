import { ApolloProvider } from '@apollo/client'
import type { Meta, StoryObj } from '@storybook/react'

import Toast from '@/components/atoms/Toast'
import { allPartsName } from '@/graphql/schema/queries/part/getAllPartsName/fixture'
import { client } from '@/pages/_app'
import { SPStory } from '@/tests/storybook'

import TrainingFooter from '.'

const partsOptions = allPartsName.parts

export default {
  component: TrainingFooter,
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
} as Meta<typeof TrainingFooter>

type Story = StoryObj<typeof TrainingFooter>

export const Default: Story = {
  ...SPStory,
}
