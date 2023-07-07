import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassCircleIcon,
} from '@heroicons/react/24/solid'
import { useState } from 'react'

import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import { LineChart } from '@/components/organisms/LineChart'
import ExerciseFilterModal from '@/components/templates/modal/ExerciseFilterModal'
import ShowDatasetModal from '@/components/templates/modal/ShowDatasetModal'
import type { StatData } from '@/types'
import getWeightGraphData from '@/utils/exercise/getWeightGraphData'

import WeightsDataTables from './WeightsDataTables'

type Props = {
  normalizedStatData: StatData
  className?: string
  loading: boolean
}
const WeightsGraph = ({ normalizedStatData, className, loading }: Props) => {
  const [span, setSpan] = useState(10)
  const [round, setRound] = useState(3)
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const [weightsDatasets, weightsDatasetsLabels, weightsDatasetsDates] =
    getWeightGraphData(normalizedStatData, round, span)

  const [isOpenDatasetModal, setIsOpenDatasetModal] = useState(false)
  return (
    <>
      <Section variant="narrow" className={className}>
        <div className="flex items-center justify-between mb-4 border-b-2 pl-3 pb-2 mx-1">
          <p className="whitespace-nowrap">重量(kg)</p>
          <button className="pr-2" onClick={() => setIsOpenFilterModal(true)}>
            <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : normalizedStatData.length !== 0 ? (
          <>
            <div className="text-xs pl-4 pb-2">
              <span>条件：</span>
              <span>
                {span}日間 / {round}セット
              </span>
            </div>
            <LineChart
              datasets={weightsDatasets}
              labels={weightsDatasetsLabels}
            />
            <button
              className="flex items-center text-sm gap-1  text-orange-600 font-bold ml-auto pr-2"
              onClick={() => setIsOpenDatasetModal(true)}
            >
              <MagnifyingGlassCircleIcon className="w-5 h-5" />
              <p>数字で見る</p>
            </button>
          </>
        ) : (
          <p className="text-sm">データがありません</p>
        )}
      </Section>
      <ExerciseFilterModal
        isOpen={isOpenFilterModal}
        setIsOpen={setIsOpenFilterModal}
        setSpan={setSpan}
        setRound={setRound}
        span={span}
        round={round}
      />
      <ShowDatasetModal
        title="重量の推移"
        isOpen={isOpenDatasetModal}
        setIsOpen={setIsOpenDatasetModal}
        content={
          <WeightsDataTables
            dates={weightsDatasetsDates}
            data={weightsDatasets.map((data) => data.data)}
          />
        }
      />
    </>
  )
}

export default WeightsGraph
