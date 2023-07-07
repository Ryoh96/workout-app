import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import type { SetAlarmInput } from '@/libs/schema/setAlarm'
import { SPStory } from '@/tests/storybook'

import InputAlarm from '.'

type Props = {
  label: string
  info?: ReactNode
}

const TestComponent = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm<SetAlarmInput>()

  return <InputAlarm register={register} errors={errors} {...props} />
}

export default {
  component: TestComponent,
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {
  ...SPStory,
}
