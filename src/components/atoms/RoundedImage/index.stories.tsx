import type { Meta, StoryObj } from '@storybook/react'

import RoundedImage from '.'

export default {
  component: RoundedImage,
  args: { src: '/rabbit.jpg', width: 100, height: 100, alt: 'rabbit' },
} as Meta<typeof RoundedImage>

type Story = StoryObj<typeof RoundedImage>

export const Default: Story = {}
