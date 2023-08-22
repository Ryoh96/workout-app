import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import Spinner from '@/components/atoms/Spinner'
import { DeleteMemoAtNoteModal } from '@/components/templates/modal/DeleteModal/DeleteMemoAtNoteModal'
import type { GetNoteMemoQuery } from '@/graphql/generated/operations-csr'
import useDeleteMemoAtModalStore from '@/store/modal/deleteMemoAtNoteModal'
import useDeleteMemoModalStore from '@/store/modal/deleteMemoModal'
import useNoteIdStore from '@/store/note/noteId'

export type Props = {
  data: GetNoteMemoQuery | undefined
  setDefaultValue: React.Dispatch<React.SetStateAction<string | undefined>>
  setIsOpenCreateMemoModal: React.Dispatch<React.SetStateAction<boolean>>
  setEditMemoIndex: React.Dispatch<React.SetStateAction<number | undefined>>
  onCompleted: () => void
  loading: boolean
}

const ShowMemosContainer = ({
  data,
  onCompleted,
  loading,
  ...props
}: Props) => {
  const [deleteMemoIndex, setDeleteMemoIndex] = useState(0)
  const noteId = useNoteIdStore((state) => state.noteId)

  return (
    <>
      <Presentational
        loading={loading}
        data={data}
        {...props}
        setDeleteMemoIndex={setDeleteMemoIndex}
      />
      {noteId && (
        <DeleteMemoAtNoteModal
          index={deleteMemoIndex}
          id={noteId}
          onDeleteCompleted={onCompleted}
        />
      )}
    </>
  )
}

type PresentationalProps = {
  setDeleteMemoIndex: React.Dispatch<React.SetStateAction<number>>
} & Omit<Props, 'onCompleted'>

export const Presentational = ({
  loading,
  data,
  setDefaultValue,
  setEditMemoIndex,
  setIsOpenCreateMemoModal,
  setDeleteMemoIndex,
}: PresentationalProps) => {
  const setIsOpenDeleteMemoModal = useDeleteMemoAtModalStore(
    (state) => state.setIsOpen
  )
  return (
    <>
      {loading ? (
        <Spinner />
      ) : data?.noteById?.memos?.length !== 0 ? (
        <ul>
          {data?.noteById?.memos?.map((memo, index) => (
            <li
              key={index}
              className="flex items-center gap-1 before:content-['・']"
            >
              <span>{memo}</span>
              <button
                onClick={() => {
                  setDefaultValue(memo)
                  setEditMemoIndex(index)
                  setIsOpenCreateMemoModal(true)
                }}
                aria-label="編集"
              >
                <PencilSquareIcon className="h-4 w-4 text-indigo-800" />
              </button>
              <button
                onClick={() => {
                  setDeleteMemoIndex(index)
                  setIsOpenDeleteMemoModal(true)
                }}
                aria-label="削除"
              >
                <TrashIcon className="h-4 w-4 text-indigo-800" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>メモがありません</p>
      )}
    </>
  )
}

export default ShowMemosContainer
