import 'react-toastify/dist/ReactToastify.css'

import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'react-toastify'
import type { ToastProps } from 'react-toastify/dist/types'

import { PCStory, SPStory } from '@/tests/storybook'

import Button from '../Button'
import Toast from '.'

const TestComponent = ({
  text,
  props,
}: {
  text: string
  props: Partial<ToastProps>
}) => {
  const notify = () => toast(text)
  return (
    <div>
      <Button onClick={notify}>Click</Button>
      <Toast {...props} />
    </div>
  )
}

export default {
  component: TestComponent,
  args: {
    text: 'Toast',
    props: {
      type: 'info',
    },
  },
} as Meta<typeof TestComponent>

type Story = StoryObj<typeof TestComponent>

export const Default: Story = {}
export const Error: Story = {
  args: {
    text: 'Error',
    props: {
      type: 'error',
    },
  },
}
