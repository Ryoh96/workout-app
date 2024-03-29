import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  BookmarkIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { useState } from 'react'

import Tag from '@/components/atoms/Tag'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import ChangeExercisePartModal from '@/components/templates/modal/ChangeExercisePartModal'
import RenameExerciseModal from '@/components/templates/modal/RenameExerciseModal'
import ShowExerciseDetailModal from '@/components/templates/modal/ShowExerciseDetailModal'
import ShowMemoListModal from '@/components/templates/modal/ShowMemoListModal'
import ShowTrainingHistoryModal from '@/components/templates/modal/ShowTrainingHistoryModal'
import type { Part, Training } from '@/graphql/generated/operations-type'

type Props = {
  removeTraining: () => void
  editTraining: () => void
  index: number
  onCompleted: () => void
  training: Training
}

const ExerciseHeader = ({
  removeTraining,
  editTraining,
  index,
  onCompleted,
  training,
}: Props) => {
  const exerciseId = training.exercise?.id ?? ''
  const trainingId = training.id
  const part = training.exercise?.parts?.[0] as Part
  const name = training.exercise?.name ?? ''

  const [isOpenExerciseMemoModal, setIsOpenExerciseMemoModal] = useState(false)
  const [isOpenTrainingHistoryModal, setIsOpenTrainingHistoryModal] =
    useState(false)
  const [isOpenExerciseDetailModal, setIsOpenExerciseDetailModal] =
    useState(false)
  const [isOpenRenameExerciseModal, setIsOpenRenameExerciseModal] =
    useState(false)
  const [isOpenChangePartModal, setIsOpenChangePartModal] = useState(false)
  const totalLoad = training.totalLoad ?? 0

  return (
    <>
      <div
        className="flex justify-between items-start border-b-2 pb-2"
        data-testid="exercise-header"
      >
        <span className="text-lg">{index + 1}.</span>
        <div
          className={`flex flex-col  items-center sticky top-0 bg-white bg-opacity-90 `}
          style={{ zIndex: 100 - index }}
        >
          <div>
            <button
              className=""
              onClick={() => setIsOpenRenameExerciseModal(true)}
            >
              <h3 className="relative text-lg font-bold text-red-600">
                {name}
              </h3>
            </button>
          </div>
          <div className="flex items-center relative w-full justify-center mb-1">
            <button
              key={part.name}
              onClick={() => setIsOpenChangePartModal(true)}
              className="mr-2"
            >
              <Tag className="-mt-2">{part.name}</Tag>
            </button>
            <p className="text-sm ">
              総負荷量:
              <span className="text-lg font-bold text-indigo- mr-1">
                {totalLoad}
              </span>
            </p>
          </div>
        </div>
        <div className="z-[100]" data-testid="trainingHeaderMenu">
          <DropDownWithButton
            icon={
              <EllipsisHorizontalIcon className="text-indigo-800 w-6 h-6" />
            }
            menuItems={[
              {
                icon: <BookmarkIcon className="text-indigo-800 w-6 h-6" />,
                name: '固定メモを見る',
                handleClick: () => {
                  setIsOpenExerciseMemoModal(true)
                },
              },
              {
                icon: (
                  <MagnifyingGlassIcon className="text-indigo-800 w-6 h-6" />
                ),
                name: '種目詳細',
                handleClick: () => {
                  setIsOpenExerciseDetailModal(true)
                },
              },

              {
                icon: (
                  <FontAwesomeIcon
                    icon={faHistory}
                    className="text-indigo-800 w-6 h-6"
                  />
                ),
                name: '種目履歴',
                handleClick: () => {
                  setIsOpenTrainingHistoryModal(true)
                },
              },
              {
                icon: <PencilSquareIcon className="text-indigo-800 w-6 h-6" />,
                name: '編集',
                handleClick: editTraining,
              },
              {
                icon: <TrashIcon className="text-indigo-800 w-6 h-6" />,
                name: '削除',
                handleClick: removeTraining,
              },
            ]}
          />
        </div>
      </div>
      <ShowMemoListModal
        id={exerciseId}
        isOpenExerciseMemoModal={isOpenExerciseMemoModal}
        setIsOpenExerciseMemoModal={setIsOpenExerciseMemoModal}
        onPinOutMemoCompleted={onCompleted}
      />
      <ShowExerciseDetailModal
        id={exerciseId}
        name={name}
        isOpen={isOpenExerciseDetailModal}
        setIsOpen={setIsOpenExerciseDetailModal}
      />
      <ShowTrainingHistoryModal
        trainingId={trainingId}
        isOpen={isOpenTrainingHistoryModal}
        setIsOpen={setIsOpenTrainingHistoryModal}
      />
      <RenameExerciseModal
        isOpen={isOpenRenameExerciseModal}
        setIsOpen={setIsOpenRenameExerciseModal}
        id={exerciseId}
        defaultValue={{ exercise: name }}
        onCompleted={onCompleted}
      />
      <ChangeExercisePartModal
        isOpen={isOpenChangePartModal}
        setIsOpen={setIsOpenChangePartModal}
        exerciseId={exerciseId}
        selected={part.id}
        onCompleted={onCompleted}
      />
    </>
  )
}

export default ExerciseHeader
