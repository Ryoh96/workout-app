import {
  AdjustmentsHorizontalIcon,
  ChartPieIcon,
} from '@heroicons/react/24/solid'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import PieChart from '@/components/organisms/PieChart'
import { useGetExerciseNameByNoteQuery } from '@/graphql/generated/operations-csr'
import type { ComboBoxOption } from '@/types'

import ExerciseFilterModal from '../../modal/ExerciseFilterModal'

type Props = {
  parts: ComboBoxOption
}

const ExerciseCountSection = ({ parts }: Props) => {
  const today = useMemo(() => new Date(), [])
  const [span, setSpan] = useState(30)

  const { data, loading } = useGetExerciseNameByNoteQuery({
    variables: {
      since: span < 0 ? undefined : subDays(today, span).toISOString(),
      until: today.toISOString(),
    },
    onError: (error) => toast.error(error.message),
  })
  const partSummary: {
    [partName: string]: { [exerciseName: string]: number }
  } = {}

  data?.notes?.forEach((note) => {
    note.trainings?.forEach((training) => {
      const exerciseName = training.exercise?.name as string
      const parts = training.exercise?.parts

      parts?.forEach((part) => {
        const partName = part.name

        if (!partSummary[partName]) {
          partSummary[partName] = {}
        }

        if (!partSummary[partName][exerciseName]) {
          partSummary[partName][exerciseName] = 1
        } else {
          partSummary[partName][exerciseName]++
        }
      })
    })
  })

  Object.keys(partSummary).forEach((partName) => {
    const exerciseCounts = partSummary[partName]

    const sortedExercises = Object.keys(exerciseCounts).sort((a, b) => {
      const countA = exerciseCounts[a]
      const countB = exerciseCounts[b]

      // 回数の降順でソート
      return countB - countA
    })

    const sortedCounts: { [exerciseName: string]: number } = {}

    sortedExercises.forEach((exerciseName) => {
      sortedCounts[exerciseName] = exerciseCounts[exerciseName]
    })

    partSummary[partName] = sortedCounts
  })

  const datasets = [
    {
      label: 'count',
      data: Object.values(partSummary[parts.name] ?? {}),
    },
  ]

  const labels = Object.keys(partSummary[parts.name] ?? {})
  const [isOpenModal, setIsOpenModal] = useState(false)
  return (
    <>
      <Section>
        <div className="relative">
          <TitleWithIcon as="h2" icon={<ChartPieIcon />}>
            よく行う種目
          </TitleWithIcon>
          <button
            className="absolute top-0 right-1"
            onClick={() => setIsOpenModal(true)}
          >
            <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : partSummary[parts.name] ? (
          <div className="w-4/5 mx-auto">
            <PieChart datasets={datasets} labels={labels} />
          </div>
        ) : (
          <p className="text-sm">種目がありません</p>
        )}
      </Section>
      <ExerciseFilterModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        setSpan={setSpan}
        span={span}
      />
    </>
  )
}

export default ExerciseCountSection
