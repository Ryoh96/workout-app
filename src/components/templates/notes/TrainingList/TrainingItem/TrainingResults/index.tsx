import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import type { Training, Unit } from '@/graphql/generated/operations-type'
import { deleteRoundModalState } from '@/recoil/Modal/DeleteRoundModal'
import { editRoundModalState } from '@/recoil/Modal/EditRoundModal'
import { deleteRoundIdState } from '@/recoil/Round/deleteRoundId'
import { editRoundState } from '@/recoil/Round/editRound'

type Props = {
  training: Training
  id: string | null
}

const TrainingResults = ({ training, id }: Props) => {
  const setIsOpenEditRoundModal = useSetRecoilState(editRoundModalState)
  const setIsOpenDeleteRoundModal = useSetRecoilState(deleteRoundModalState)
  const setEditedRound = useSetRecoilState(editRoundState)
  const setDeleteRoundId = useSetRecoilState(deleteRoundIdState)

  return (
    <table className="border-collapse bg-white rounded mx-auto border-b-2 w-full max-w-md">
      {training.rounds?.map((round, index) => (
        <tr key={index} className="w-full border-b-2 rounded px-1">
          <div className="flex items-center w-full justify-between">
            <th className="pl-2 pr-2 text-blue-900 py-2 xs:w-1/5">
              {index + 1}
              <span className='text-sm'>set</span>
            </th>
            <td className="pl-1 py-2 xs:w-3/5 text-center whitespace-nowrap">
              <span>
                <span className="font-bold mr-0.5">{round.weight}</span>
                <span className="text-sm">
                  {round.unit.toLocaleLowerCase()}
                </span>
              </span>
              <span className="mx-1">&times;</span>
              <span>
                <span className="font-bold mr-0.5">{round.repetition}</span>
                <span className="text-sm">reps</span>
              </span>
              <span className="ml-1">
                <span className="mr-0.5 text-sm"> (IV:</span>
                <span className="font-bold">
                  {round.interval
                    ? `${Math.floor(round.interval / 60)}:` +
                      `${round.interval % 60}`.padStart(2, '0')
                    : '--:--'}
                </span>
                )
              </span>
            </td>
            <td
              className={`flex items-center gap-2 py-2 pl-2  ${
                training.id !== id && 'invisible'
              }`}
            >
              <button
                onClick={() => {
                  setEditedRound(round)
                  setIsOpenEditRoundModal(true)
                }}
              >
                <PencilSquareIcon className="h-5 w-5 text-indigo-800" />
              </button>
              <button
                onClick={() => {
                  setDeleteRoundId(round.id)
                  setIsOpenDeleteRoundModal(true)
                }}
              >
                <TrashIcon className="h-5 w-5 text-indigo-800" />
              </button>
            </td>
          </div>
        </tr>
      ))}
    </table>
  )
}

export default TrainingResults
