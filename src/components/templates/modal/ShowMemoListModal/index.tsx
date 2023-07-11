import { BookmarkIcon, ClockIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Modal from '@/components/organisms/Modal'
import PinOutMemoModal from '@/components/templates/modal/PinOutMemoModal'
import {
  useDeleteMemoMutation,
  useGetPinnedMemosByExercisesQuery,
} from '@/graphql/generated/operations-csr'
import { dateFormat } from '@/utils/dateFormat'
import { ManipulationError } from '@/utils/errors'

type Props = {
  id: string
  isOpenExerciseMemoModal: boolean
  setIsOpenExerciseMemoModal: React.Dispatch<React.SetStateAction<boolean>>
  onPinOutMemoCompleted: () => void
}

const ShowMemoListModal = ({
  id,
  isOpenExerciseMemoModal,
  setIsOpenExerciseMemoModal,
  onPinOutMemoCompleted,
}: Props) => {
  const [deleteMemoMutation] = useDeleteMemoMutation()
  const { data, loading, error, refetch } = useGetPinnedMemosByExercisesQuery({
    variables: {
      id,
    },
    onCompleted: onPinOutMemoCompleted,
    onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenPinOutMemoModal, setIsOpenPinOutMemoModal] = useState(false)
  const [memoId, setMemoId] = useState<string | null>(null)
  return (
    <>
      <Modal
        title="固定メモ"
        titleIcon={<BookmarkIcon />}
        content={
          <div className="w-full">
            <div className="flex gap-2 w-full justify-end items-center -mt-4">
              <p className="text-[12px] flex whitespace-nowrap items-center">
                <BookmarkIcon className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">: メモの固定解除</span>
              </p>
              /
              <p className="text-[12px] flex whitespace-nowrap items-center">
                <TrashIcon className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">: メモの削除</span>
              </p>
            </div>
            <div className="mt-3">
              {loading && <Spinner />}
              {error && <p className="text-sm">エラーが発生しました</p>}
            </div>
            {!loading && (
              <ul className="text-black space-y-3 w-full">
                {!(data?.pinnedMemos && data?.pinnedMemos?.length === 0) ? (
                  data?.pinnedMemos?.map((memo, index) => (
                    <li key={index}>
                      {memo && (
                        <div>
                          <div className="flex items-center gap-1">
                            <span>
                              <ClockIcon className="w-4 h-4 text-blue-800" />
                            </span>
                            <span className="text-gray-800">
                              {dateFormat(new Date(memo.createdAt))}
                            </span>
                            <button>
                              <TrashIcon
                                className="w-4 h-4 text-orange-600"
                                onClick={() => {
                                  setMemoId(memo.id)
                                  setIsOpen(true)
                                }}
                              />
                            </button>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setMemoId(memo.id)
                                setIsOpenPinOutMemoModal(true)
                              }}
                            >
                              <BookmarkIcon className="w-4 h-4 text-red-600" />
                            </button>
                            <span className="text-base">{memo.content}</span>
                          </div>
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li>メモがありません</li>
                )}
              </ul>
            )}
          </div>
        }
        isOpen={isOpenExerciseMemoModal}
        closeModal={() => setIsOpenExerciseMemoModal(false)}
        handlers={[
          {
            name: '閉じる',
            handleClick: () => setIsOpenExerciseMemoModal(false),
          },
        ]}
        onOpen={() => refetch({ id })}
      />
      <Modal
        title="メモの削除"
        titleIcon={<TrashIcon />}
        content={<p>このメモを削除しますか？</p>}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        handlers={[
          {
            name: '削除',
            handleClick: async () => {
              if (!memoId) return
              try {
                await toast.promise(
                  deleteMemoMutation({
                    variables: {
                      id: memoId,
                    },
                  }),
                  {
                    success: '削除しました',
                    error: {
                      render({ data }) {
                        //@ts-ignore
                        return `${data.message}`
                      },
                    },
                  },
                  {
                    autoClose: 3000,
                  }
                )

                await refetch({ id })
                setMemoId(null)
              } catch (error) {
                console.error(error)
              }
            },
          },
          {
            name: 'キャンセル',
            handleClick: () => setMemoId(null),
          },
        ]}
      />
      <PinOutMemoModal
        isOpen={isOpenPinOutMemoModal}
        closeModal={() => setIsOpenPinOutMemoModal(false)}
        id={memoId}
        onPinOutCompleted={async () => refetch({ id })}
      />
    </>
  )
}

export default ShowMemoListModal
