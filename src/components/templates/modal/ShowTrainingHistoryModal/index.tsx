import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import HorizontalTable from '@/components/molecules/HorizontalTable'
import Modal from '@/components/organisms/Modal'
import { useGetPreviousTrainingsQuery } from '@/graphql/generated/operations-csr'
import type { Round } from '@/graphql/generated/operations-type'
import { dateFormat } from '@/utils/dateFormat'
import makeRoundsSummary from '@/utils/makeRoundsSummary'

type Props = {
  trainingId: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ShowTrainingHistoryModal = ({ trainingId, isOpen, setIsOpen }: Props) => {
  const { data: previousData, loading: previousLoading } =
    useGetPreviousTrainingsQuery({
      variables: { id: trainingId, limit: 10 },
      onError: (error) => toast.error(error.message),
    })
  return (
    <Modal
      title="種目の履歴"
      titleIcon={<FontAwesomeIcon icon={faHistory} className="w-6 h-6" />}
      content={
        previousLoading ? (
          <Spinner />
        ) : previousData?.previousTrainings?.length !== 0 ? (
          <div className="w-4/5">
            {previousData?.previousTrainings?.map((training, index) => (
              <div key={index} className="pb-10 w-full">
                <HorizontalTable
                  index={index + 1}
                  title={dateFormat(new Date(training?.note.date ?? '')) ?? ''}
                  data={makeRoundsSummary(training?.rounds as Round[])}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">データがありません</p>
        )
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

export default ShowTrainingHistoryModal
