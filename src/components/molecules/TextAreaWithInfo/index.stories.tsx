import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

import EmphasizedText from '@/components/atoms/EmphasizedText'
import InputCounter from '@/components/atoms/InputCounter'
import { PCStory, SPStory } from '@/tests/storybook'

import TextAreaWithInfo from '.'

export default {
  component: TextAreaWithInfo,
} as Meta<typeof TextAreaWithInfo>

type Story = StoryObj<typeof TextAreaWithInfo>

export const Default: Story = {
  args: {
    label: 'ラベル',
  },
}

export const HasValue: Story = {
  args: {
    label: 'ラベル',
    value: 'テキスト',
  },
}

export const HasPlaceholder: Story = {
  args: {
    placeholder: '入力してください',
    label: 'ラベル',
  },
}

export const IsError: Story = {
  args: {
    label: 'ラベル',
    error: 'エラーがあります',
  },
}

export const HasMoreInfo: Story = {
  args: {
    label: 'ラベル',
    info: <EmphasizedText content={30} unit="kg" />,
  },
}

export const HasInputCounter: Story = {
  args: {
    label: 'ラベル',
    inputCounter: (
      <div className="text-right pr-1 text-xs text-gray-900">0 / 30</div>
    ),
  },
}

export const HiddenLabelAndHasInfo: Story = {
  args: {
    label: 'ラベル',
    labelVisible: false,
    info: <EmphasizedText content={30} unit="kg" />,
  },
}

export const HasAllProps: Story = {
  args: {
    label: 'ラベル',
    info: <EmphasizedText content={30} unit="kg" />,
    error: 'エラーがあります',
    inputCounter: (
      <div className="text-right pr-1 text-xs text-gray-900">0 / 30</div>
    ),
  },
}
