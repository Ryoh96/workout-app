import { render, screen } from '@testing-library/react'
import { useState } from 'react'

import { noteMemo } from '@/graphql/schema/queries/note/getNoteMemo/fixture'

import type { Props } from '.'
import ShowMemos from '.'

const data = noteMemo
const onCompleted = jest.fn()

const TestComponent = (
  props: Omit<
    Props,
    'setDefaultValue' | 'setIsOpenCreateMemoModal' | 'setEditMemoIndex'
  >
) => {
  const [defaultMemoValue, setDefaultMemoValue] = useState<string | undefined>(
    undefined
  )
  const [editMemoIndex, setEditMemoIndex] = useState<number | undefined>(
    undefined
  )
  const [isOpenCreateMemoModal, setIsOpenCreateMemoModal] = useState(false)
  const [isOpenEditMemoModal, setIsOpenEditMemoModal] = useState(false)

  return (
    <ShowMemos
      setDefaultValue={setDefaultMemoValue}
      setIsOpenCreateMemoModal={setIsOpenCreateMemoModal}
      setEditMemoIndex={setEditMemoIndex}
      data={props.data}
      loading={props.loading}
      onCompleted={props.onCompleted}
    />
  )
}

describe('ShowMemos', () => {
  test('should render loading icon', () => {
    render(
      <TestComponent data={data} onCompleted={onCompleted} loading={true} />
    )
    data.noteById?.memos?.forEach((memo) => {
      expect(screen.queryByText(memo)).not.toBeInTheDocument()
    })
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
  test('should render props', () => {
    render(
      <TestComponent data={data} onCompleted={onCompleted} loading={false} />
    )
    data.noteById?.memos?.forEach((memo) => {
      expect(screen.getByText(memo)).toBeInTheDocument()
    })
    expect(screen.getAllByRole('listitem')).toHaveLength(
      data.noteById?.memos?.length as number
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
  test('should render buttons', async () => {
    render(
      <TestComponent data={data} onCompleted={onCompleted} loading={false} />
    )
    expect(screen.getAllByRole('button', { name: '編集' })).toHaveLength(
      data.noteById?.memos?.length as number
    )
    expect(screen.getAllByRole('button', { name: '削除' })).toHaveLength(
      data.noteById?.memos?.length as number
    )
  })
})
