import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

import TextAreaWithInfo from '@/components/molecules/TextAreaWithInfo'

import InputCounter from '.'

type Props = {
  text?: string
}

const TestComponent = ({ text = '' }: Props) => {
  const { register, control } = useForm({ defaultValues: { text } })
  return (
    <>
      <TextAreaWithInfo
        label="ラベル"
        {...register('text')}
        id="text"
        inputCounter={<InputCounter max={5} name="text" control={control} />}
      />
    </>
  )
}

export default {
  component: TestComponent,
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}

export const Over: Story = {
  args: {
    text: 'hogehoge',
  },
}
