import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { ComboBoxOption } from '@/types'

import ComboBox from '.'

type Props = {
  options: ComboBoxOption[]
  variant?: 'default' | 'small'
}

const options = [
  { id: 1, name: 'ダンベルベンチプレス' },
  { id: 2, name: 'ダンベルフライ' },
  { id: 3, name: 'インクラインダンベルベンチプレス' },
  { id: 4, name: 'インクラインダンベルフライ' },
  { id: 5, name: 'ディップス' },
  { id: 6, name: 'プルオーバー' },
  { id: 7, name: 'フレンチプレス' },
  { id: 8, name: 'ケーブルプルオーバー' },
  { id: 9, name: 'ベンチプレス' },
]

const TestComponent = ({ options, variant }: Props) => {
  const [selected, setSelected] = useState<ComboBoxOption>(options[0])
  return (
    <ComboBox
      options={options}
      selected={selected}
      setSelected={setSelected}
      variant={variant}
    />
  )
}

export default {
  component: TestComponent,
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {
  args: { options },
}
export const Small: Story = {
  args: { options, variant: 'small' },
}

export const NoOptions: Story = {
  args: { options: [] },
}
