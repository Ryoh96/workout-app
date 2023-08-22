import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

import type { Training } from '@/graphql/generated/operations-type'
import useDeleteRoundModalStore from '@/store/modal/deleteRoundModal'
import useEditRoundModalStore from '@/store/modal/editRoundModal'
import useDeleteRoundIdStore from '@/store/round/deleteRoundId'
import useEditRoundStore from '@/store/round/editRound'

type Props = {
  training: Training
  id: string | null
}

const TrainingResults = ({ training, id }: Props) => {
  const setIsOpenEditRoundModal = useEditRoundModalStore(
    (state) => state.setIsOpen
  )
  const setIsOpenDeleteRoundModal = useDeleteRoundModalStore(
    (state) => state.setIsOpen
  )
  const setEditedRound = useEditRoundStore((state) => state.setEditRound)
  const setDeleteRoundId = useDeleteRoundIdStore((state) => state.setDeleteId)

  return (
    <table
      className="border-collapse bg-white rounded mx-auto border-b-2 w-full max-w-md"
      data-testid="training-results"
    >
      {training.rounds?.map((round, index) => (
        <tr key={index} className="w-full border-b-2 rounded px-1">
          <div className="flex items-center w-full justify-between">
            <th
              className="pl-2 pr-2 text-blue-900 py-2 xs:w-1/5"
              data-testid="set"
            >
              {index + 1}
              <span className="text-sm">set</span>
            </th>
            <td className="pl-1 py-2 xs:w-3/5 text-center whitespace-nowrap">
              <span>
                <span className="font-bold mr-0.5" data-testid="weight">
                  {round.weight}
                </span>
                <span className="text-sm">
                  {round.unit.toLocaleLowerCase()}
                </span>
              </span>
              <span className="mx-1">&times;</span>
              <span>
                <span className="font-bold mr-0.5" data-testid="reps">
                  {round.repetition}
                </span>
                <span className="text-sm">reps</span>
              </span>
              <span className="ml-1">
                <span className="mr-0.5 text-sm"> (IV:</span>
                <span className="font-bold" data-testid="interval">
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
                data-testid="edit-round"
              >
                <PencilSquareIcon className="h-5 w-5 text-indigo-800" />
                <span className="sr-only">編集</span>
              </button>
              <button
                onClick={() => {
                  setDeleteRoundId(round.id)
                  setIsOpenDeleteRoundModal(true)
                }}
                data-testid="remove-round"
              >
                <TrashIcon className="h-5 w-5 text-indigo-800" />
                <span className="sr-only">削除</span>
              </button>
            </td>
          </div>
        </tr>
      ))}
    </table>
  )
}

export default TrainingResults
