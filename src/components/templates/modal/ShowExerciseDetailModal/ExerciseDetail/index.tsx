import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import { LineChart } from '@/components/organisms/LineChart'
import {
  useGetMaxTotalLoadQuery,
  useGetMaxWeightQuery,
  useGetTrainingStatQuery,
} from '@/graphql/generated/operations-csr'
import { ManipulationError } from '@/utils/errors'
import getNormalizedStatData from '@/utils/exercise/getNormalizedStatData'
import getRoundsAverage from '@/utils/exercise/getRoundsAverage'
import getTotalLoadGraphData from '@/utils/exercise/getTotalLoadsGraphData'
import getWeightGraphData from '@/utils/exercise/getWeightGraphData'

type Props = {
  id: string
  name: string
}

const ExerciseDetail = ({ id, name }: Props) => {
  const {
    data: maxWeightData,
    loading: maxWeightLoading,
    refetch: maxWeightDataRefetch,
    error: maxWeightError,
  } = useGetMaxWeightQuery({
    variables: { exerciseId: id },
    onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
  })
  const {
    data: maxTotalLoadData,
    loading: maxTotalLoadLoading,
    refetch: maxTotalLoadDataRefetch,
    error: maxTotalLoadError,
  } = useGetMaxTotalLoadQuery({
    variables: { exerciseId: id },
    onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
  })

  const {
    data: statData,
    loading: statLoading,
    refetch: statDataRefetch,
    error: statError,
  } = useGetTrainingStatQuery({
    variables: {
      exerciseId: id,
      limit: 30,
    },
    onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
  })

  useEffect(() => {
    maxWeightDataRefetch()
    maxTotalLoadDataRefetch()
    statDataRefetch()
  }, [maxTotalLoadDataRefetch, maxWeightDataRefetch, statDataRefetch])

  const normalizedStatData = getNormalizedStatData(statData)
  const averages = getRoundsAverage(normalizedStatData)
  const [weightsDatasets, weightsDatasetsLabels] =
    getWeightGraphData(normalizedStatData)
  const [totalLoadsDatasets, totalLoadsDatasetsLabels] =
    getTotalLoadGraphData(normalizedStatData)

  return (
    <div>
      <TitleWithIcon
        icon={<FontAwesomeIcon icon={faDumbbell} className="w-6 h-6 mt-1.5" />}
        as="h2"
        className="-mt-4"
      >
        {name}
      </TitleWithIcon>
      <div className="space-y-1 mb-4">
        <p>
          <span className="font-bold">・最大重量:</span>{' '}
          {maxWeightLoading ? (
            <div data-testid="skelton" className="inline">
              <Skeleton width={310} className="ml-2" />
            </div>
          ) : maxWeightError ? (
            <span className="text-sm" role="alert">
              エラーが発生しました
            </span>
          ) : (
            <span>
              <span
                className="text-lg font-bold text-red-600 mr-1"
                data-testid="maxWeight"
              >
                {maxWeightData?.maxWeight?.maxWeight}
              </span>
              kg
            </span>
          )}
        </p>
        <p>
          <span className="font-bold">・最大総負荷量:</span>{' '}
          {maxTotalLoadLoading ? (
            <div data-testid="skelton" className="inline">
              <Skeleton width={280} className="ml-2" />
            </div>
          ) : maxTotalLoadError ? (
            <span className="text-sm" role="alert">
              エラーが発生しました
            </span>
          ) : (
            <span>
              <span
                className="text-lg font-bold text-red-600 mr-1"
                data-testid="maxTotalLoad"
              >
                {maxTotalLoadData?.maxTotalLoad?.maxTotalLoad}
              </span>
              kg
            </span>
          )}
        </p>

        <div className="mb-6 pt-1">
          <span className="font-bold pb-3">・平均重量:</span>
          {statLoading ? (
            <div className="text-center mx-auto" data-testid="skelton">
              <Skeleton width={380} className="ml-2" />
              <Skeleton width={380} className="ml-2" />
              <Skeleton width={380} className="ml-2" />
            </div>
          ) : statError ? (
            <span className="text-sm" role="alert">
              エラーが発生しました
            </span>
          ) : (
            <ul className="ml-4">
              {averages.map(({ weight }, index) => (
                <li key={index}>
                  <span>- {index + 1}set:</span>{' '}
                  <span
                    className="text-lg font-bold text-red-600"
                    data-testid="average"
                  >
                    {Number(weight.toFixed(2))}
                  </span>{' '}
                  kg
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mb-3">
        <span className="font-bold">・重量の推移:</span>
        {statLoading ? (
          <Spinner />
        ) : statError ? (
          <span className="text-sm" role="alert">
            エラーが発生しました
          </span>
        ) : (
          <div data-testid="weightTransition">
            <LineChart
              datasets={weightsDatasets}
              labels={weightsDatasetsLabels}
            />
          </div>
        )}
      </div>
      <div>
        <span className="font-bold">・総負荷量の推移:</span>
        {statLoading ? (
          <Spinner />
        ) : statError ? (
          <span className="text-sm" role="alert">
            エラーが発生しました
          </span>
        ) : (
          <div data-testid="totalLoadTransition">
            <LineChart
              datasets={totalLoadsDatasets}
              labels={totalLoadsDatasetsLabels}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ExerciseDetail
