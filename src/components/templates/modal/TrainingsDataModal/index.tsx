import { ChartPieIcon } from '@heroicons/react/24/solid'

import Modal from '@/components/organisms/Modal'
import TrainingsData from '@/components/templates/notes/TrainingsData'
import type { GetNoteQuery } from '@/graphql/generated/operations-csr'
import type { Training } from '@/graphql/generated/operations-type'
import { datetimeFormat } from '@/utils/dateFormat'
import createTrainingSummary from '@/utils/notes/createTrainingSummary'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  noteData: GetNoteQuery | undefined
}

const TrainingsDataModal = ({ isOpen, setIsOpen, noteData }: Props) => {
  const summaries = createTrainingSummary(
    (noteData?.note?.trainings ?? []) as Training[]
  )
  return (
    <Modal
      title="この日のデータ"
      titleIcon={<ChartPieIcon />}
      content={
        <div className="space-y-10">
          {noteData && noteData.note && summaries.length !== 0 ? (
            <TrainingsData
              datetime={datetimeFormat(
                new Date(noteData.note!.createdAt),
                true
              )}
              noteData={noteData}
            />
          ) : (
            <p>データがありません</p>
          )}
        </div>
      }
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      handlers={[
        {
          name: '閉じる',
          handleClick: () => setIsOpen(false),
        },
      ]}
    />
  )
}

export default TrainingsDataModal
