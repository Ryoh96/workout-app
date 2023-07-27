import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

import useCurrentDateStore from '@/store/date/currentDate'
import { SPStory } from '@/tests/storybook'

import TrainingHeader from '.'

type Props = ComponentProps<typeof TrainingHeader> & { currentDate: Date }

const Component = (props: Props) => {
  const setCurrentDate = useCurrentDateStore((state) => state.setCurrentDate)
  setCurrentDate(props.currentDate)

  return <TrainingHeader />
}

export default {
  component: Component,
  ...SPStory,
  args: {
    currentDate: new Date(),
  },
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
