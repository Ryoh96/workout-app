import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import type { ComboBoxOption } from '@/types'

import Modal from '.'

const user = userEvent.setup()

type Props = {
  title: string
  content: ReactNode
  handlers: {
    name: string
    handleClick: () => void
  }[]
  openModalButton: string
}

const TestComponent = ({ openModalButton, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const openModal = () => setIsOpen(true)
  return (
    <>
      <Button onClick={openModal}>{openModalButton}</Button>
      <Modal {...props} isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}

const openModalButton = "click"

const props = {
  title: 'title',
  content: 'content',
  handlers: [
    {
      name: 'handler1',
      handleClick: jest.fn(),
    },
    {
      name: 'handler2',
      handleClick: jest.fn(),
    },
  ],
  openModalButton: 'click',
}


describe('Modal', () => {
  afterEach(() => {
    props.handlers.forEach(handler => handler.handleClick.mockClear())
  })
  test('should not display when initial state', async () => {
    render(<TestComponent {...props} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  test('should appear modal when click button', async () => {
    render(<TestComponent {...props} />)
    await user.click(
      screen.getByRole('button', { name: props.openModalButton })
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
  test('should disappear modal when click around modal', async () => {
    render(<TestComponent {...props} />)
    await user.click(
      screen.getByRole('button', { name: props.openModalButton })
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.click(screen.getByTestId('around-modal'))
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
  test('should show props values in modal', async () => {
    render(<TestComponent {...props} />)
    await user.click(
      screen.getByRole('button', { name: props.openModalButton })
    )
    expect(
      screen.getByRole('heading', { name: props.title })
    ).toBeInTheDocument()
    expect(screen.getByText(props.content)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: props.handlers[0].name })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: props.handlers[1].name })
    ).toBeInTheDocument()
  })
  test('should click props button and close modal', async () => {
    render(<TestComponent {...props} />)
    await user.click(
      screen.getByRole('button', { name: props.openModalButton })
    )
    await user.click(
      screen.getByRole('button', { name: props.handlers[0].name })
    )
    expect(props.handlers[0].handleClick).toBeCalled()
  
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
    await user.click(
      screen.getByRole('button', { name: props.openModalButton })
    )
    await user.click(
      screen.getByRole('button', { name: props.handlers[1].name })
    )
    expect(props.handlers[1].handleClick).toBeCalled()
  
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

  })
})

const CloseOutOfModal = ({ openModalButton, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const openModal = () => setIsOpen(true)
  return (
    <>
      <Button onClick={openModal}>{openModalButton}</Button>
      <Modal {...props} isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}
