import type { Meta, StoryObj } from '@storybook/react'

import SelectBox from '.'

export default {
  component: SelectBox,
} as Meta<typeof SelectBox>

type Story = StoryObj<typeof SelectBox>

const options = [
  {
    name: 'kg',
    value: 'KG',
    selected: true,
  },
  {
    name: 'lb',
    value: 'LB',
  },
]

export const Default: Story = {
  args: {
    options,
  },
}

export const Middle: Story = {
  args: {
    options,
    variant: 'middle',
  },
}

export const Large: Story = {
  args: {
    options,
    variant: 'large',
  },
}
