import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import type { ComboBoxOption } from '@/types'

import ComboBox from '.'

const user = userEvent.setup()

type Props = {
  options: ComboBoxOption[]
  variant?: 'default' | 'small'
}

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

const options = [
  { id: 0, name: 'hoge' },
  { id: 1, name: 'fuga' },
  { id: 2, name: 'hogehoge' },
  { id: 3, name: 'piyo' },
  { id: 4, name: 'hogefuga' },
  { id: 5, name: 'hogefugapiyo' },
]

describe('ComboBox', () => {
  test('should selected the default value and not show the options', () => {
    render(<TestComponent options={options} />)
    expect(screen.getByRole('combobox')).toHaveValue(options[0].name)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
  test('should show options when click the select button', async () => {
    render(<TestComponent options={options} />)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
  })
  test('should close options when click the select button twice', async () => {
    render(<TestComponent options={options} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('button'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
  test('should change the combobox value when select a option', async () => {
    render(<TestComponent options={options} />)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    await user.click(screen.getByRole('option', { name: options[3].name }))
    expect(await screen.findByRole('combobox')).toHaveValue(options[3].name)
  })
  test("should show 「見つかりません」 when type don't registered value", async () => {
    render(<TestComponent options={options} />)
    await user.click(screen.getByRole('button'))
    const combobox = screen.getByRole('combobox')

    // delete all texts
    ;[...Array(20)].forEach(async (_, index) => {
      await user.type(combobox, '{backspace}')
    })
    await user.type(combobox, 'あ')
    expect(await screen.findByText('見つかりません')).toBeInTheDocument()
  })
  test('should work autocomplete functions', async () => {
    render(<TestComponent options={options} />)
    await user.click(screen.getByRole('button'))
    const combobox = screen.getByRole('combobox')

    // delete all texts
    ;[...Array(20)].forEach(async (_, index) => {
      await user.type(combobox, '{backspace}')
    })
    await user.type(combobox, 'hoge')

    // expect show texts including "hoge" in autocomplete
    const listbox = screen.getByRole('listbox')
    expect(
      await within(listbox).findByText(options[0].name)
    ).toBeInTheDocument()
    expect(within(listbox).queryByText(options[1].name)).not.toBeInTheDocument()
    expect(within(listbox).getByText(options[2].name)).toBeInTheDocument()
    expect(within(listbox).queryByText(options[3].name)).not.toBeInTheDocument()
    expect(within(listbox).getByText(options[4].name)).toBeInTheDocument()
    expect(within(listbox).getByText(options[5].name)).toBeInTheDocument()

    // expect show texts including "hogefuga" in autocomplete
    await user.type(combobox, 'fuga')
    expect(
      await within(listbox).findByText(options[4].name)
    ).toBeInTheDocument()
    expect(within(listbox).getByText(options[5].name)).toBeInTheDocument()
    expect(within(listbox).queryByText(options[0].name)).not.toBeInTheDocument()
    expect(within(listbox).queryByText(options[1].name)).not.toBeInTheDocument()
    expect(within(listbox).queryByText(options[2].name)).not.toBeInTheDocument()
    expect(within(listbox).queryByText(options[3].name)).not.toBeInTheDocument()

    // expect show texts including "hogefugapiyo" in autocomplete
    await user.type(combobox, 'piyo')
    expect(
      await within(listbox).findByText(options[5].name)
    ).toBeInTheDocument()
    expect(within(listbox).queryByText(options[0].name)).not.toBeInTheDocument()
    expect(within(listbox).queryByText(options[1].name)).not.toBeInTheDocument()
    expect(within(listbox).queryByText(options[2].name)).not.toBeInTheDocument()
    expect(within(listbox).queryByText(options[3].name)).not.toBeInTheDocument()
    expect(within(listbox).queryByText(options[4].name)).not.toBeInTheDocument()
  })
})
