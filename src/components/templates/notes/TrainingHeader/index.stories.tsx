import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import type { RecoilState } from 'recoil'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import { currentDateState } from '@/recoil/currentDate/states'
import { SPStory } from '@/tests/storybook'

import TrainingHeader from '.'

type Props = ComponentProps<typeof TrainingHeader> & { currentDate: Date }

const Component = (props: Props) => {
  const setCurrentDate = useSetRecoilState(currentDateState)
  setCurrentDate(props.currentDate)

  return <TrainingHeader />
}

export default {
  component: Component,
  ...SPStory,
  args: {
    currentDate: new Date(),
  },
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
} as Meta<typeof Component>

type Story = StoryObj<typeof Component>

export const Default: Story = {}
