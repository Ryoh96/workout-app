import type { Meta, StoryObj } from '@storybook/react'

import EmphasizedText from '@/components/atoms/EmphasizedText'
import { PCStory, SPStory } from '@/tests/storybook'

import TextBoxWithInfo from '.'

export default {
  component: TextBoxWithInfo,
} as Meta<typeof TextBoxWithInfo>

type Story = StoryObj<typeof TextBoxWithInfo>

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

export const HasInfo: Story = {
  args: {
    label: 'ラベル',
    info: <EmphasizedText content={30} unit="kg" />,
  },
}

export const HiddenLabel: Story = {
  args: {
    label: 'ラベル',
    labelVisible: false,
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
