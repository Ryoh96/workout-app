import {
  BellIcon,
  ChartPieIcon,
  ClockIcon,
  PencilIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'
import { toast } from 'react-toastify'

import Timer from '@/components/molecules/Timer'
import EditMemoAtNoteModal from '@/components/templates/modal/EditMemoAtNoteModal'
import TrainingsDataModal from '@/components/templates/modal/TrainingsDataModal'
import type { GetNoteQuery } from '@/graphql/generated/operations-type'

import SetAlarmModal from '../../modal/SetAlermModal'

type Props = {
  noteData: GetNoteQuery | undefined
  className?: string
}

const TrainingFooter = ({ noteData, className }: Props) => {
  const [isOpenSetAlarmModal, setIsOpenSetAlarmModal] = useState(false)
  const [isOpenEditMemoModal, setIsOpenEditMemoModal] = useState(false)
  const [isOpenTrainingDataModal, setIsOpenTrainingDataModal] = useState(false)

  return (
    <>
      <div
        className={clsx(
          'fixed bg-gradient-to-r from-orange-600 to-rose-600 bottom-0 left-0 w-full py-2 flex gap-6 justify-center z-[101]',
          className
        )}
      >
        <button
          className="grid items-center justify-center  w-10"
          onClick={() => {
            toast(<Timer />, {
              autoClose: false,
              closeOnClick: false,
            })
          }}
        >
          <ClockIcon className="w-6 h-6 mx-auto text-white" />
          <span className="text-[10px] text-white">タイマー</span>
        </button>
        <button
          className="grid items-center justify-center w-10"
          onClick={() => setIsOpenSetAlarmModal(true)}
        >
          <BellIcon className="w-6 h-6 mx-auto text-white " />
          <span className="text-[10px] text-white">アラーム</span>
        </button>
        <button
          className="grid items-center justify-center  w-10"
          onClick={() => setIsOpenEditMemoModal(true)}
        >
          <PencilIcon className="w-6 h-6 mx-auto text-white" />
          <span className="text-[10px] text-white">メモ</span>
        </button>
        <button
          className="grid items-center justify-center  w-10"
          onClick={() => setIsOpenTrainingDataModal(true)}
        >
          <ChartPieIcon className="w-6 h-6 mx-auto text-white" />
          <span className="text-[10px] text-white">データ</span>
        </button>
      </div>
      <SetAlarmModal
        isOpen={isOpenSetAlarmModal}
        setIsOpen={setIsOpenSetAlarmModal}
      />
      <EditMemoAtNoteModal
        isOpen={isOpenEditMemoModal}
        setIsOpen={setIsOpenEditMemoModal}
      />
      <TrainingsDataModal
        isOpen={isOpenTrainingDataModal}
        setIsOpen={setIsOpenTrainingDataModal}
        noteData={noteData}
      />
    </>
  )
}

export default TrainingFooter
