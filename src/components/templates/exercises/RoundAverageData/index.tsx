import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import ExerciseFilterModal from '@/components/templates/modal/ExerciseFilterModal'
import type { StatData } from '@/types'
import getRoundCountAverage from '@/utils/exercise/getRoundCountAverage'

type Props = {
  normalizedStatData: StatData
  loading: boolean
}

const RoundAverageDataContainer = ({ normalizedStatData, loading }: Props) => {
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)

  const [span, setSpan] = useState(30)
  const roundCountAverage = getRoundCountAverage(normalizedStatData, span)
  return (
    <>
      <Presentational
        roundCountAverage={roundCountAverage}
        setIsOpenFilterModal={setIsOpenFilterModal}
        loading={loading}
      />
      <ExerciseFilterModal
        isOpen={isOpenFilterModal}
        setIsOpen={setIsOpenFilterModal}
        setSpan={setSpan}
        span={span}
      />
    </>
  )
}

type PresentationalProps = {
  roundCountAverage: number
  setIsOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

export const Presentational = ({
  roundCountAverage,
  setIsOpenFilterModal,
  loading,
}: PresentationalProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <p>・平均セット数:</p>
        <p>
          {loading ? (
            <Skeleton width={180} className="ml-2" />
          ) : (
            <span>
              <span className="text-base font-bold mx-1">
                {Number.isNaN(roundCountAverage)
                  ? '--'
                  : Number(roundCountAverage).toFixed(2)}
              </span>
              回
            </span>
          )}
        </p>
      </div>
      <button className="pr-2" onClick={() => setIsOpenFilterModal(true)}>
        <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
      </button>
    </div>
  )
}

export default RoundAverageDataContainer
