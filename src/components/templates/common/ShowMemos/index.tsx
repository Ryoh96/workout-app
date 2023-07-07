import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import Spinner from '@/components/atoms/Spinner'
import { DeleteMemoAtNoteModal } from '@/components/templates/modal/DeleteModal/DeleteMemoAtNoteModal'
import type { GetNoteMemoQuery } from '@/graphql/generated/operations-csr'
import { deleteMemoAtNoteModalState } from '@/recoil/Modal/DeleteMemoAtNoteModal'
import { noteIdState } from '@/recoil/Note/noteId'

type Props = {
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
  const noteId = useRecoilValue(noteIdState)

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
  const setIsOpenDeleteMemoModal = useSetRecoilState(deleteMemoAtNoteModalState)
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
              >
                <PencilSquareIcon className="h-4 w-4 text-indigo-800" />
              </button>
              <button
                onClick={() => {
                  setDeleteMemoIndex(index)
                  setIsOpenDeleteMemoModal(true)
                }}
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
