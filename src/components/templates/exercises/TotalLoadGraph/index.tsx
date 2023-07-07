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
import getTotalLoadGraphData from '@/utils/exercise/getTotalLoadsGraphData'

import TotalLoadDataTables from './TotalLoadDataTables'

type Props = {
  normalizedStatData: StatData
  loading: boolean
  className?: string
}

const TotalLoadGraph = ({ normalizedStatData, className, loading }: Props) => {
  const [span, setSpan] = useState(10)
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const [
    totalLoadsDatasets,
    totalLoadsDatasetsLabels,
    totalLoadsDatasetsDates,
  ] = getTotalLoadGraphData(normalizedStatData, span)
  const [isOpenDatasetModal, setIsOpenDatasetModal] = useState(false)
  return (
    <>
      <Section variant="narrow" className={className}>
        <div className="flex items-center justify-between mb-4 border-b-2 pl-3 pb-2 mx-1">
          <p className="whitespace-nowrap">総負荷量(kg)</p>
          <button className="pr-2" onClick={() => setIsOpenFilterModal(true)}>
            <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : normalizedStatData.length !== 0 ? (
          <>
            <div className="text-xs pl-4">
              <span>条件：</span>
              <span>{span}日間</span>
            </div>
            <LineChart
              datasets={totalLoadsDatasets}
              labels={totalLoadsDatasetsLabels}
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
        span={span}
      />
      <ShowDatasetModal
        title="総負荷量の推移"
        isOpen={isOpenDatasetModal}
        setIsOpen={setIsOpenDatasetModal}
        content={
          <TotalLoadDataTables
            dates={totalLoadsDatasetsDates}
            data={totalLoadsDatasets.map((data) => data.data)}
          />
        }
      />
    </>
  )
}

export default TotalLoadGraph
