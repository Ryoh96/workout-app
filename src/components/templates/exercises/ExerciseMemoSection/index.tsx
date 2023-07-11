import {
  BookmarkIcon,
  ClockIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { forwardRef, useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import { DeleteMemoModal } from '@/components/templates/modal/DeleteModal/DeleteMemoModal'
import PinOutMemoModal from '@/components/templates/modal/PinOutMemoModal'
import type { GetPinnedMemosByExercisesQuery } from '@/graphql/generated/operations-csr'
import { useGetPinnedMemosByExercisesQuery } from '@/graphql/generated/operations-csr'
import { dateFormat } from '@/utils/dateFormat'
import { ManipulationError } from '@/utils/errors'

type ContainerProps = { id: string } & React.ComponentPropsWithoutRef<'div'>

const ExerciseMemoSectionContainer = forwardRef<HTMLDivElement, ContainerProps>(
  function ExerciseMemoSection({ id }, ref) {
    const queryResult = useGetPinnedMemosByExercisesQuery({
      variables: { id },
      onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
    })
    const [memoId, setMemoId] = useState<string | null>(null)
    const [isOpenDeleteMemoModal, setIsOpenDeleteMemoModal] = useState(false)
    const [isOpenPinOutMemoModal, setIsOpenPinOutMemoModal] = useState(false)

    return (
      <>
        <Presentational
          id={id}
          {...queryResult}
          setMemoId={setMemoId}
          setIsOpenDeleteMemoModal={setIsOpenDeleteMemoModal}
          setIsOpenPinOutMemoModal={setIsOpenPinOutMemoModal}
          ref={ref}
        />
        <DeleteMemoModal
          onDeleteCompleted={() => queryResult.refetch({ id })}
          memoId={memoId}
          setMemoId={setMemoId}
          isOpen={isOpenDeleteMemoModal}
          setIsOpen={setIsOpenDeleteMemoModal}
        />
        <PinOutMemoModal
          isOpen={isOpenPinOutMemoModal}
          closeModal={() => setIsOpenPinOutMemoModal(false)}
          id={memoId}
          onPinOutCompleted={async () => queryResult.refetch({ id })}
        />
      </>
    )
  }
)

type PresentationalProps = {
  data?: GetPinnedMemosByExercisesQuery
  loading: boolean
  setMemoId: React.Dispatch<React.SetStateAction<string | null>>
  setIsOpenDeleteMemoModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenPinOutMemoModal: React.Dispatch<React.SetStateAction<boolean>>
} & ContainerProps

export const Presentational = forwardRef<HTMLDivElement, PresentationalProps>(
  function ExerciseMemoSection(
    {
      data: memoData,
      loading: memoLoading,
      setMemoId,
      setIsOpenDeleteMemoModal,
      setIsOpenPinOutMemoModal,
    },
    ref
  ) {
    return (
      <Section ref={ref}>
        <div className="relative">
          <TitleWithIcon as="h2" icon={<PencilIcon />}>
            メモ
          </TitleWithIcon>
          <div className="absolute -top-1 right-2">
            <DropDownWithButton
              icon={
                <QuestionMarkCircleIcon className="text-indigo-800 w-6 h-6" />
              }
              menuItems={[
                {
                  icon: <BookmarkIcon className="w-4 h-4 text-gray-600" />,
                  name: 'メモの固定解除',
                },
                {
                  icon: <TrashIcon className="w-4 h-4 text-gray-600" />,
                  name: 'メモの固定解除',
                },
              ]}
            />
          </div>
        </div>
        {memoLoading ? (
          <Spinner />
        ) : (
          <div className="text-sm">
            {memoData && memoData.pinnedMemos?.length !== 0 ? (
              <ul className="space-y-4">
                {memoData?.pinnedMemos?.map((memo, index) => (
                  <Section key={index} className="!pt-2 !pb-3 !px-3 !-mx-1">
                    <li>
                      {memo && (
                        <div>
                          <div className="flex items-center justify-between gap-1  border-b border-b-gray-400 pb-1 mb-1">
                            <span className="flex items-center gap-1">
                              <span>
                                <ClockIcon className="w-4 h-4 text-blue-800" />
                              </span>
                              <span className="text-gray-700">
                                {dateFormat(new Date(memo.createdAt))}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setMemoId(memo.id)
                                  setIsOpenPinOutMemoModal(true)
                                }}
                              >
                                <BookmarkIcon className="w-5 h-5  text-red-600 hover:text-red-400" />
                              </button>
                              <button
                                onClick={() => {
                                  setMemoId(memo.id)
                                  setIsOpenDeleteMemoModal(true)
                                }}
                              >
                                <TrashIcon className="w-5 h-5 text-orange-600 cursor-pointer hover:text-orange-400" />
                              </button>
                            </span>
                          </div>
                          <div className="flex items-start gap-1">
                            <span>{memo.content}</span>
                          </div>
                        </div>
                      )}
                    </li>
                  </Section>
                ))}
              </ul>
            ) : (
              <p className="text-sm">メモがありません</p>
            )}
          </div>
        )}
      </Section>
    )
  }
)

export default ExerciseMemoSectionContainer
