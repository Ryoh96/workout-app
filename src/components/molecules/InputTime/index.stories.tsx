import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import { SPStory } from '@/tests/storybook'

import InputTime from '.'

type Props = {
  label: string
  info?: ReactNode
}

const TestComponent = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm<UpsertRoundInput>()

  return <InputTime register={register} errors={errors} {...props} />
}

export default {
  component: TestComponent,
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {
  args: {
    label: 'インターバル',
  },
  ...SPStory,
}

export const HasInfo: Story = {
  args: {
    label: 'インターバル',
    info: <p>1:30</p>,
  },
  ...SPStory,
}
