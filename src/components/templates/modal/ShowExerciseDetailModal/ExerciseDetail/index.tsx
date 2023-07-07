import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import { LineChart } from '@/components/organisms/LineChart'
import {
  useGetMaxTotalLoadQuery,
  useGetMaxWeightQuery,
  useGetTrainingStatQuery,
} from '@/graphql/generated/operations-csr'
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
    onError: (error) => toast.error(error.message),
  })
  const {
    data: maxTotalLoadData,
    loading: maxTotalLoadLoading,
    refetch: maxTotalLoadDataRefetch,
    error: maxTotalLoadError,
  } = useGetMaxTotalLoadQuery({
    variables: { exerciseId: id },
    onError: (error) => toast.error(error.message),
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
    onError: (error) => toast.error(error.message),
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
            <Spinner variant="small" />
          ) : maxWeightError ? (
            <span className="text-sm" role="alert">
              エラーが発生しました
            </span>
          ) : (
            <span>
              <span className="text-lg font-bold text-red-600">
                {maxWeightData?.maxWeight?.maxWeight}
              </span>
              kg
            </span>
          )}
        </p>
        <p>
          <span className="font-bold">・最大総負荷量:</span>{' '}
          {maxTotalLoadLoading ? (
            <Spinner variant="small" />
          ) : maxTotalLoadError ? (
            <span className="text-sm" role="alert">
              エラーが発生しました
            </span>
          ) : (
            <span>
              <span className="text-lg font-bold text-red-600">
                {maxTotalLoadData?.maxTotalLoad?.maxTotalLoad}
              </span>
              kg
            </span>
          )}
        </p>

        <div className="mb-6 pt-1">
          <p>
            <span className="font-bold pb-3">・平均重量:</span>
          </p>
          {statLoading ? (
            <Spinner variant="small" />
          ) : statError ? (
            <span className="text-sm" role="alert">
              エラーが発生しました
            </span>
          ) : (
            <ul className="ml-4">
              {averages.map(({ weight }, index) => (
                <li key={index}>
                  <span>- {index + 1}set:</span>{' '}
                  <span className="text-lg font-bold text-red-600">
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
        <p className="font-bold">・重量の推移</p>
        {statLoading ? (
          <Spinner />
        ) : statError ? (
          <span className="text-sm" role="alert">
            エラーが発生しました
          </span>
        ) : (
          <LineChart
            datasets={weightsDatasets}
            labels={weightsDatasetsLabels}
          />
        )}
      </div>
      <div>
        <p className="font-bold">・総負荷量の推移</p>
        {statLoading ? (
          <Spinner />
        ) : statError ? (
          <span className="text-sm" role="alert">
            エラーが発生しました
          </span>
        ) : (
          <LineChart
            datasets={totalLoadsDatasets}
            labels={totalLoadsDatasetsLabels}
          />
        )}
      </div>
    </div>
  )
}

export default ExerciseDetail
