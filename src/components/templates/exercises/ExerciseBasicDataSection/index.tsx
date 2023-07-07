import { ChartBarIcon, ClockIcon } from '@heroicons/react/24/solid'
import { id } from 'date-fns/locale'
import { forwardRef, useEffect } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Tag from '@/components/atoms/Tag'
import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import {
  useGetMaxTotalLoadQuery,
  useGetMaxWeightQuery,
} from '@/graphql/generated/operations-csr'
import type { GetExerciseQuery } from '@/graphql/generated/operations-type'
import type { StatData } from '@/types'
import { dateFormat } from '@/utils/dateFormat'

import OrderAverageData from '../OrderAverageData'
import RoundAverageData from '../RoundAverageData'
import WeightAverageData from '../WeightAverageData'

type Props = {
  exerciseData?: GetExerciseQuery
  id: string
  normalizedStatData: StatData
  statLoading: boolean
  setIsOpenChangePartModal: React.Dispatch<React.SetStateAction<boolean>>
} & React.ComponentPropsWithoutRef<'div'>

const ExerciseBasicDataSection = forwardRef<HTMLDivElement, Props>(
  function ExerciseBasicDataSection(
    {
      exerciseData,
      id,
      normalizedStatData,
      statLoading,
      setIsOpenChangePartModal,
    },
    ref
  ) {
    const {
      data: maxWeightData,
      loading: maxWeightLoading,
      refetch: maxWeightDataRefetch,
    } = useGetMaxWeightQuery({
      variables: { exerciseId: id },
      onError: (error) => toast.error(error.message),
    })
    const {
      data: maxTotalLoadData,
      loading: maxTotalLoadLoading,
      refetch: maxTotalLoadDataRefetch,
    } = useGetMaxTotalLoadQuery({
      variables: { exerciseId: id },
      onError: (error) => toast.error(error.message),
    })

    const trainingNum = normalizedStatData?.length ?? 0
    const startDate = normalizedStatData?.[0]?.date
    const lastDate = normalizedStatData?.at(-1)?.date

    useEffect(() => {
      maxWeightDataRefetch()
      maxTotalLoadDataRefetch()
    }, [maxTotalLoadDataRefetch, maxWeightDataRefetch])

    return (
      <Section className="position relative" ref={ref}>
        <TitleWithIcon as="h2" icon={<ChartBarIcon />}>
          基礎データ
        </TitleWithIcon>

        <div className="space-y-3 divide-y-2 [&>*]:pt-3 text-sm pb-4 -mt-2">
          <div className="flex items-center">
            <p>
              ・部位：
              {exerciseData?.exercise?.parts?.map((part) => (
                <button
                  key={part.name}
                  onClick={() => setIsOpenChangePartModal(true)}
                >
                  <Tag className="-mt-2">{part.name}</Tag>
                </button>
              ))}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>
              ・最大重量：
              {maxWeightLoading ? (
                <Spinner variant="small" />
              ) : (
                <span>
                  <span className="text-base font-bold mr-1">
                    {maxWeightData?.maxWeight?.maxWeight ?? '--'}
                  </span>
                  kg
                </span>
              )}
            </p>
            <span className="flex items-center text-sm pr-2">
              {
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 " />
                  最終更新日:
                  {maxWeightData?.maxWeight?.createdAt ? (
                    <span>
                      {dateFormat(
                        new Date(maxWeightData?.maxWeight?.createdAt)
                      )}
                    </span>
                  ) : (
                    '--:--'
                  )}
                </span>
              }
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p>
              ・最大総負荷量：
              {maxTotalLoadLoading ? (
                <Spinner variant="small" />
              ) : (
                <span>
                  <span className="text-base font-bold mr-1">
                    {maxTotalLoadData?.maxTotalLoad?.maxTotalLoad ?? '--'}
                  </span>
                  kg
                </span>
              )}
            </p>
            <span className="flex items-center text-sm pr-2">
              {
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 " />
                  最終更新日:
                  {maxTotalLoadData?.maxTotalLoad?.createdAt ? (
                    <span>
                      {dateFormat(
                        new Date(maxTotalLoadData?.maxTotalLoad?.createdAt)
                      )}
                    </span>
                  ) : (
                    '--:--'
                  )}
                </span>
              }
            </span>
          </div>

          <WeightAverageData
            normalizedStatData={normalizedStatData}
            loading={statLoading}
          />
          <RoundAverageData
            normalizedStatData={normalizedStatData}
            loading={statLoading}
          />
          <OrderAverageData id={id} />
          <div className="flex items-center">
            <p>・累計トレーニング回数：</p>
            <p>
              <span className="text-base font-bold">{trainingNum}</span> 回
            </p>
          </div>
          <div className="flex items-center">
            <p>・開始日：</p>
            <p>
              {startDate ? (
                <span className="text-base font-bold">
                  {dateFormat(new Date(startDate), true)}
                </span>
              ) : (
                <p>データがありません</p>
              )}
            </p>
          </div>
          <div className="flex items-center">
            <p>・最終更新日：</p>
            <p className="">
              {lastDate ? (
                <span className="text-base font-bold">
                  {dateFormat(new Date(lastDate), true)}
                </span>
              ) : (
                <p>データがありません</p>
              )}
            </p>
          </div>
        </div>
      </Section>
    )
  }
)

export default ExerciseBasicDataSection
