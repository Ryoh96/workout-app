import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import Spinner from '@/components/atoms/Spinner'
import ExerciseFilterModal from '@/components/templates/modal/ExerciseFilterModal'
import type { StatData } from '@/types'
import getRoundsAverage from '@/utils/exercise/getRoundsAverage'

type Props = {
  normalizedStatData: StatData
  loading: boolean
}

const WeightAverageData = ({ normalizedStatData, loading }: Props) => {
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const [span, setSpan] = useState(30)
  const [round, setRound] = useState(3)
  const averages = getRoundsAverage(normalizedStatData, round, span)
  return (
    <>
      <Presentational
        averages={averages}
        setIsOpenFilterModal={setIsOpenFilterModal}
        loading={loading}
      />
      <ExerciseFilterModal
        isOpen={isOpenFilterModal}
        setIsOpen={setIsOpenFilterModal}
        setSpan={setSpan}
        setRound={setRound}
        span={span}
        round={round}
      />
    </>
  )
}

type PresentationalProps = {
  averages: {
    weight: number
    reps: number
    interval: number
  }[]
  setIsOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
}

export const Presentational = ({
  averages,
  setIsOpenFilterModal,
  loading,
}: PresentationalProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 justify-between mb-2">
        <p className="whitespace-nowrap">・平均重量 - 回数 (IV) </p>
        <button className="pr-2" onClick={() => setIsOpenFilterModal(true)}>
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : averages.length !== 0 ? (
        <ul className="w-11/12 mx-auto max-w-xm border-t-2">
          {averages.map(({ weight, reps, interval }, index) => {
            const intervalAverage = Number(interval.toFixed(0))
            return (
              <li
                key={index}
                className="flex items-center border-b-2 justify-between"
              >
                <p className="p-2  ml-0.5 mr-4  font-bold">{index + 1}set</p>{' '}
                <p className="px-1 text-right pr-4">
                  <span className="text-base font-bold">
                    {Number.isNaN(weight) ? '--' : Number(weight.toFixed(2))}
                  </span>{' '}
                  kg -{' '}
                  <span className="text-base font-bold">
                    {Number.isNaN(weight) ? '--' : Number(reps.toFixed(2))}
                  </span>{' '}
                  reps (IV:
                  <span className="text-base font-bold">
                    {intervalAverage
                      ? `${Math.floor(intervalAverage / 60)}:` +
                        `${intervalAverage % 60}`.padStart(2, '0')
                      : '--:--'}
                  </span>
                  )
                </p>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-sm">データがありません</p>
      )}
    </div>
  )
}

export default WeightAverageData
