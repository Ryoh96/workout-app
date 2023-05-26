import {
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'

import Accordion from '@/components/organisms/Accordion'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import PopUp from '@/components/organisms/PopUp'

type Props = {
  name: string
  totalLoad: number
  previousTotalLoad: number
  memo: string
  removeTraining: () => void
  editTraining: () => void
}

export const ExerciseHeader = ({
  name,
  totalLoad,
  previousTotalLoad,
  memo,
  removeTraining,
  editTraining,
}: Props) => {
  return (
    <div
      className={`flex flex-col items-center sticky top-4 bg-white bg-opacity-90 z-10 pb-2`}
    >
      <h2 className="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600 text-center border-b border-gray-400 pb-2 w-full">
        {name}
      </h2>
      <div className="absolute right-0">
        <DropDownWithButton
          icon={<EllipsisHorizontalIcon className="text-sky-800 w-6 h-6" />}
          menuItems={[
            {
              icon: <PencilSquareIcon className="text-sky-800 w-6 h-6" />,
              name: '編集',
              handleClick: editTraining,
            },
            {
              icon: <TrashIcon className="text-sky-800 w-6 h-6" />,
              name: '削除',
              handleClick: removeTraining,
            },
          ]}
        />
      </div>
      <div className="flex items-center relative w-full justify-center mb-1">
        <p className="text-sm ">
          総負荷量:
          <span className="text-lg font-bold text-sky- mr-1">{totalLoad}</span>
          <span className="text-sm">(前回:{previousTotalLoad})</span>
        </p>
        <div className="absolute -right-2 top-1.5">
          <PopUp title="メモ" variant="small">
            <p>僧帽筋に力を入れすぎない</p>
          </PopUp>
        </div>
      </div>
    </div>
  )
}
