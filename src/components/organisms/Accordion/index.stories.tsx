import type { Meta, StoryObj } from '@storybook/react'

import Accordion from '.'

export default {
  component: Accordion,
  args: {
    title: 'Accordion',
    children: (
      <ul>
        <li>item1</li>
        <li>item2</li>
      </ul>
    ),
  },
} as Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Default: Story = {}
