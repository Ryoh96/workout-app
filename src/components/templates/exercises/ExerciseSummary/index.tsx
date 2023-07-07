import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ClockIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { id } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import DeleteExerciseModal from '@/components/templates/modal/DeleteModal/DeleteExerciseModal'
import type { GetMaxTotalLoadQuery } from '@/graphql/generated/operations-csr'
import {
  useGetMaxTotalLoadQuery,
  useGetMaxWeightQuery,
  useGetTrainingStatQuery,
} from '@/graphql/generated/operations-csr'
import type { GetMaxWeightQuery } from '@/graphql/generated/operations-type'
import { deleteExerciseModalState } from '@/recoil/Modal/DeleteExerciseModal'
import { dateFormat } from '@/utils/dateFormat'
import getNormalizedStatData from '@/utils/exercise/getNormalizedStatData'

type ContainerProps = {
  exercise: {
    id: string
    name: string
  }
  index: number
  onCompleted: () => void
}

const ExerciseSummaryContainer = (props: ContainerProps) => {
  const { data: maxWeightData, loading: maxWeightLoading } =
    useGetMaxWeightQuery({
      variables: { exerciseId: props.exercise.id },
      onError: (error) => toast.error(error.message),
    })
  const { data: maxTotalLoadData, loading: maxTotalLoadLoading } =
    useGetMaxTotalLoadQuery({
      variables: { exerciseId: props.exercise.id },
      onError: (error) => console.error(error.message),
    })
  console.log(89, maxTotalLoadData)
  const { data: statData, loading: statLoading } = useGetTrainingStatQuery({
    variables: {
      exerciseId: props.exercise.id,
    },
    onError: (error) => toast.error(error.message),
  })

  const normalizedStatData = getNormalizedStatData(statData)
  const trainingNum = normalizedStatData?.length ?? 0
  const lastDate = normalizedStatData?.at(-1)?.date

  return (
    <>
      <Presentational
        maxTotalLoadData={maxTotalLoadData}
        maxTotalLoadLoading={maxTotalLoadLoading}
        maxWeightData={maxWeightData}
        maxWeightLoading={maxWeightLoading}
        trainingNum={trainingNum}
        lastDate={lastDate}
        statLoading={statLoading}
        {...props}
      />
      <DeleteExerciseModal
        deleteId={props.exercise.id}
        onCompleted={props.onCompleted}
      />
    </>
  )
}

type PresentationalProps = {
  maxWeightData?: GetMaxWeightQuery
  maxWeightLoading: boolean
  maxTotalLoadData?: GetMaxTotalLoadQuery
  maxTotalLoadLoading: boolean
  trainingNum: number
  lastDate?: string
  statLoading: boolean
} & ContainerProps

export const Presentational = ({
  maxWeightData,
  maxWeightLoading,
  maxTotalLoadData,
  maxTotalLoadLoading,
  exercise,
  statLoading,
  index,
  trainingNum,
  lastDate,
}: PresentationalProps) => {
  const router = useRouter()
  const setIsOpenDeleteExerciseModal = useSetRecoilState(
    deleteExerciseModalState
  )

  return (
    <div className="text-sm mb-3 border-2 rounded-lg shadow-md p-3 flex items-center justify-between relative bg-slate-50">
      <div className="w-full">
        <div className="flex items-center  border-b-2 w-full mb-2 pb-2 gap-2">
          <Link
            href={`/exercises/${exercise.id}`}
            className="font-bold text-base text-indigo-900 max-w-[90%]"
          >
            <FontAwesomeIcon
              icon={faFireFlameCurved}
              className="text-red-500 mr-1.5"
            />
            {exercise.name}
          </Link>
        </div>
        <div className="w-full space-y-1">
          <p className="flex items-baseline justify-between">
            <span className="mr-2">・トレーニング回数:</span>
            {statLoading ? (
              <Skeleton width={160} className="ml-2" />
            ) : (
              <span className="inline-flex items-center">
                <span className="font-bold text-base mr-0.5">
                  {trainingNum}
                </span>
                回
              </span>
            )}
          </p>
          <p className="flex items-baseline justify-between">
            <span className="mr-2">・最大重量: </span>
            {maxWeightLoading ? (
              <Skeleton width={200} className="ml-2" />
            ) : (
              <span className="inline-flex items-center">
                <span className="font-bold text-base mr-0.5">
                  {maxWeightData?.maxWeight?.maxWeight ?? '--'}
                </span>
                kg
              </span>
            )}
          </p>
          <p className="flex items-baseline justify-between">
            <span className="mr-2">・最大総負荷量: </span>
            {maxTotalLoadLoading ? (
              <Skeleton width={200} className="ml-2" />
            ) : (
              <span className="inline-flex items-center">
                <span className="font-bold text-base mr-0.5">
                  {maxTotalLoadData?.maxTotalLoad?.maxTotalLoad ?? '--'}
                </span>
                kg
              </span>
            )}
          </p>
          <p className="flex items-baseline justify-between">
            <span className="mr-2">・最終更新日: </span>
            {statLoading ? (
              <Skeleton width={200} className="ml-2" />
            ) : lastDate ? (
              <span className="font-bold text-base">
                {dateFormat(new Date(lastDate), true)}
              </span>
            ) : (
              '--:--'
            )}
          </p>
        </div>
      </div>
      <div
        className="absolute top-1.5 right-2 "
        style={{ zIndex: 100 - index }}
      >
        <DropDownWithButton
          icon={<EllipsisHorizontalIcon className="text-indigo-800 w-6 h-6" />}
          menuItems={[
            {
              icon: <MagnifyingGlassIcon className="text-indigo-800 w-6 h-6" />,
              name: '種目の詳細',
              handleClick: () => router.push(`/exercises/${exercise.id}`),
            },
            {
              icon: <TrashIcon className="text-indigo-800 w-6 h-6" />,
              name: '種目の削除',
              handleClick: () => setIsOpenDeleteExerciseModal(true),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default ExerciseSummaryContainer
