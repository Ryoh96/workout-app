import { ApolloProvider } from '@apollo/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { c } from 'msw/lib/glossary-de6278a9'

import Toast from '@/components/atoms/Toast'
import type { Round } from '@/graphql/generated/operations-type'
import { handleEditRound } from '@/graphql/schema/mutations/round/editRoundInput/msw'
import { note } from '@/graphql/schema/queries/note/getNote/fixture'
import useEditRoundModalStore from '@/store/modal/editRoundModal'
import useEditRoundStore from '@/store/round/editRound'
import { client, setupMockServer } from '@/tests/jest'

import EditRoundModal from '.'

const user = userEvent.setup()
const server = setupMockServer(handleEditRound())

const editRound = note.note?.trainings?.[0].rounds?.[0] as Round

type Props = {
  editRound?: Partial<Round>
}

const TestComponent = (props: Props) => {
  const setIsOpenEditRoundModal = useEditRoundModalStore(
    (state) => state.setIsOpen
  )
  const setEditedRound = useEditRoundStore((state) => state.setEditRound)

  props.editRound && setEditedRound(props.editRound)

  return (
    <ApolloProvider client={client}>
      <button
        onClick={() => setIsOpenEditRoundModal(true)}
        data-testid="openModal"
      >
        Click
      </button>
      <EditRoundModal onCompleted={jest.fn()} />
      <Toast />
    </ApolloProvider>
  )
}

const openModal = async () => {
  await user.click(screen.getByTestId('openModal'))
}

const type = async (
  target: string,
  text: string,
  type: 'textbox' | 'spinbutton' = 'textbox'
) => {
  await user.type(screen.getByRole(type, { name: target }), text)
}

const clear = async (
  target: string,
  type: 'textbox' | 'spinbutton' = 'textbox'
) => {
  await user.clear(screen.getByRole(type, { name: target }))
}

const register = async () => {
  await user.click(screen.getByRole('button', { name: '完了' }))
}

describe('EditRoundModal: basic function', () => {
  it('should open the modal', async () => {
    render(<TestComponent />)
    await openModal()
    expect(screen.getByText('セットの編集')).toBeInTheDocument()
  })

  it('should empty form value when open the modal as create mode', async () => {
    render(<TestComponent />)
    await openModal()

    expect(screen.getByText('セットの編集')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: '重量' })).toHaveValue('')
    expect(screen.getByRole('spinbutton', { name: '回数' })).toHaveValue(null)
    expect(screen.getByRole('spinbutton', { name: '分' })).toHaveValue(null)
    expect(screen.getByRole('spinbutton', { name: '秒' })).toHaveValue(null)
    expect(screen.getByRole('textbox', { name: 'メモ' })).toHaveValue('')
    expect(screen.getByRole('combobox', { name: '単位' })).toHaveValue('kg')
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('should show error messages when send empty value', async () => {
    render(<TestComponent />)
    await openModal()
    await register()
    expect(screen.getByTestId('weight-errorMessage')).toHaveTextContent(
      '数値を入力してください'
    )
    expect(screen.getByTestId('repetition-errorMessage')).toHaveTextContent(
      '数値を入力してください'
    )
    expect(screen.getByTestId('minutes-errorMessage')).toHaveTextContent(
      '数値を入力してください'
    )
    expect(screen.getByTestId('seconds-errorMessage')).toHaveTextContent(
      '数値を入力してください'
    )
    expect(screen.queryByTestId('memo-errorMessage')).not.toBeInTheDocument()
  })

  it('should have form value when open the modal as edit mode', async () => {
    render(<TestComponent editRound={editRound} />)
    await openModal()
    expect(screen.getByText('セットの編集')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: '重量' })).toHaveValue(
      String(editRound.weight)
    )
    expect(screen.getByRole('spinbutton', { name: '回数' })).toHaveValue(
      Number(editRound.repetition)
    )
    expect(screen.getByRole('spinbutton', { name: '分' })).toHaveValue(
      Number(Math.floor((editRound.interval ?? 0) / 60))
    )
    expect(screen.getByRole('spinbutton', { name: '秒' })).toHaveValue(
      Number(Math.floor((editRound.interval ?? 0) % 60))
    )
    expect(screen.getByRole('textbox', { name: 'メモ' })).toHaveValue(
      editRound.memo!.content
    )
    expect(screen.getByRole('combobox', { name: '単位' })).toHaveValue('kg')
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should pass validations: success', async () => {
    render(<TestComponent editRound={editRound} />)
    await openModal()
    expect(screen.getByText('セットの編集')).toBeInTheDocument()
    await register()
    expect(await screen.findByText('更新しました')).toBeInTheDocument()
  })

  it('should pass validations: pending', async () => {
    server.use(handleEditRound({ status: 200 }))
    render(<TestComponent editRound={editRound} />)
    await openModal()
    expect(screen.getByText('セットの編集')).toBeInTheDocument()
    await register()
    expect(await screen.findByText('更新中')).toBeInTheDocument()
  })

  it('should pass validations: error', async () => {
    server.use(handleEditRound({ status: 500 }))
    render(<TestComponent editRound={editRound} />)
    await openModal()
    expect(screen.getByText('セットの編集')).toBeInTheDocument()
    await register()
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument()
  })
})

describe('EditRoundModal: validations', () => {
  describe('weight form validations', () => {
    it('should show error messages when send string type value', async () => {
      render(<TestComponent />)
      await openModal()

      // should appear error message
      await type('重量', 'abc')
      await register()
      expect(screen.getByTestId('weight-errorMessage')).toHaveTextContent(
        '数値を入力してください'
      )

      // show pass the validate
      await clear('重量')
      await type('重量', '123')
      await register()
      expect(
        screen.queryByTestId('weight-errorMessage')
      ).not.toBeInTheDocument()
    })

    describe('weight form validations', () => {
      it('should show error messages when send negative number value', async () => {
        render(<TestComponent />)
        await openModal()
        await type('回数', '-1', 'spinbutton')
        await register()
        expect(screen.getByTestId('repetition-errorMessage')).toHaveTextContent(
          '0以上の値を入力してください'
        )
      })

      it('should show error messages when send upper limit number value', async () => {
        render(<TestComponent />)
        await openModal()

        // over 1000
        await type('回数', '1000', 'spinbutton')
        await register()
        expect(screen.getByTestId('repetition-errorMessage')).toHaveTextContent(
          '桁数が大きすぎます'
        )

        // 999
        await clear('回数', 'spinbutton')
        await type('回数', '999', 'spinbutton')
        expect(
          screen.queryByTestId('repetition-errorMessage')
        ).not.toBeInTheDocument()
      })
    })

    describe('interval form validations', () => {
      it('should show error messages when send negative number value', async () => {
        render(<TestComponent />)
        await openModal()
        await type('分', '-1', 'spinbutton')
        await type('秒', '-1', 'spinbutton')
        await register()
        expect(screen.getByTestId('minutes-errorMessage')).toHaveTextContent(
          '0以上の値を入力してください'
        )
        expect(screen.getByTestId('seconds-errorMessage')).toHaveTextContent(
          '0以上の値を入力してください'
        )
      })

      it('should show error messages when send massive number value', async () => {
        render(<TestComponent />)
        await openModal()

        // over 100/60
        await type('分', '100', 'spinbutton')
        await type('秒', '60', 'spinbutton')
        await register()
        expect(screen.getByTestId('minutes-errorMessage')).toHaveTextContent(
          '桁数が大きすぎます'
        )
        expect(screen.getByTestId('seconds-errorMessage')).toHaveTextContent(
          '入力できる数字は59秒までです'
        )

        // 99/59
        await clear('分', 'spinbutton')
        await type('分', '99', 'spinbutton')
        await clear('秒', 'spinbutton')
        await type('秒', '59', 'spinbutton')
        expect(
          screen.queryByTestId('minutes-errorMessage')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('seconds-errorMessage')
        ).not.toBeInTheDocument()
      })
    })

    describe('memo form validations', () => {
      it('should show error messages when send massive length sting', async () => {
        render(<TestComponent />)
        await openModal()

        // over 100
        await type(
          'メモ',
          '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
        )
        await register()
        expect(screen.getByTestId('memo-errorMessage')).toHaveTextContent(
          '入力できる文字数は100文字までです'
        )

        // just 100
        await clear('メモ')
        await type(
          'メモ',
          '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
        )
        expect(
          screen.queryByTestId('memo-errorMessage')
        ).not.toBeInTheDocument()
      })
    })
  })
})
