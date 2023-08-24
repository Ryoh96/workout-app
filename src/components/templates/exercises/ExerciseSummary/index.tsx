import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import { useGetTrainingStatQuery } from '@/graphql/generated/operations-csr'
import { dateFormat } from '@/utils/dateFormat'
import { ManipulationError } from '@/utils/errors'
import getNormalizedStatData from '@/utils/exercise/getNormalizedStatData'

type Exercise = {
  id: string
  name: string
}

type Props = {
  exercise: Exercise
  index: number
  setDeleteExercise: (exercise: Exercise) => void
}

const ExerciseSummary = ({ exercise, index, setDeleteExercise }: Props) => {
  const { data: statData, loading: statLoading } = useGetTrainingStatQuery({
    variables: {
      exerciseId: exercise.id,
    },
    onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
  })

  const normalizedStatData = getNormalizedStatData(statData)
  const trainingNum = normalizedStatData?.length ?? 0
  const lastDate = normalizedStatData?.at(-1)?.date
  const router = useRouter()

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
              <div data-testid="skelton">
                <Skeleton width={160} className="ml-2" data-testid="skelton" />
              </div>
            ) : (
              <span className="inline-flex items-center">
                <span
                  className="font-bold text-base mr-0.5"
                  data-testid="trainingNum"
                >
                  {trainingNum}
                </span>
                回
              </span>
            )}
          </p>
          <p className="flex items-baseline justify-between">
            <span className="mr-2">・最終更新日: </span>
            {statLoading ? (
              <div data-testid="skelton">
                <Skeleton width={200} className="ml-2" />
              </div>
            ) : lastDate ? (
              <span className="font-bold text-base" data-testid="lastUpdatedAt">
                {dateFormat(new Date(lastDate), true)}
              </span>
            ) : (
              <span className="font-bold text-base" data-testid="lastUpdatedAt">
                {'--:--'}
              </span>
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
              handleClick: () => setDeleteExercise(exercise),
            },
          ]}
        />
      </div>
    </div>
  )
}

export default ExerciseSummary
