import {
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import { LineChart } from '@/components/organisms/LineChart'
import { useGetTotalLoadByNoteQuery } from '@/graphql/generated/operations-csr'
import type { GetTotalLoadByNoteQuery } from '@/graphql/generated/operations-type'
import type { ComboBoxOption } from '@/types'
import { dateFormat } from '@/utils/dateFormat'
import { ManipulationError } from '@/utils/errors'

import ExerciseFilterModal from '../../modal/ExerciseFilterModal'

type Props = {
  parts: ComboBoxOption
  className?: string
}

const TotalLoadSection = ({ parts, className }: Props) => {
  const today = useMemo(() => new Date(), [])
  const [span, setSpan] = useState(30)

  const { data: totalLoadData, loading: totalLoadLoading } =
    useGetTotalLoadByNoteQuery({
      variables: {
        since: span < 0 ? undefined : subDays(today, span).toISOString(),
        until: today.toISOString(),
      },
      onError: (error) => {
        if (error instanceof ManipulationError) {
          toast.error(error.message)
          return
        }
        console.error(error)
      },
    })

  const getTotalLoadsByDate = (totalLoadData?: GetTotalLoadByNoteQuery) => {
    const result: { [date: string]: { [name: string]: number } } = {}

    totalLoadData?.notes?.forEach((note) => {
      const { date, trainings } = note

      trainings?.forEach((training) => {
        const { exercise, totalLoad } = training

        exercise?.parts?.forEach((part) => {
          const { name } = part

          if (!result[date]) {
            result[date] = {}
          }

          if (!result[date][name]) {
            result[date][name] = 0
          }

          result[date][name] += totalLoad ?? 0
        })
      })
    })
    return result
  }

  const getTotalLoadByPart = (
    filterValue: string,
    data: {
      [date: string]: {
        [name: string]: number
      }
    }
  ) => {
    const filteredResult: { [date: string]: { [name: string]: number } } = {}

    Object.entries(data).forEach(([date, values]) => {
      const filteredValues: { [name: string]: number } = {}

      Object.entries(values).forEach(([name, totalLoad]) => {
        if (name === filterValue) {
          filteredValues[name] = totalLoad
        }
      })

      if (Object.keys(filteredValues).length > 0) {
        filteredResult[date] = filteredValues
      }
    })
    return filteredResult
  }

  const totalLoadByPart = getTotalLoadByPart(
    parts.name,
    getTotalLoadsByDate(totalLoadData)
  )
  const dataArray = Object.entries(totalLoadByPart).map(([date, totalLoad]) => [
    date,
    Object.values(totalLoad)[0],
  ])
  const datasets = [
    {
      label: '総負荷量',
      data: dataArray.map((data) => data[1] as number).reverse(),
    },
  ]
  const labels = dataArray
    .map((data) => dateFormat(new Date(data[0])))
    .reverse()
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <Section className={className}>
        <div className="relative">
          <TitleWithIcon as="h2" icon={<ChartBarIcon />}>
            {parts.name}の総負荷量の推移
          </TitleWithIcon>
          <button
            className="absolute top-0 right-1"
            onClick={() => setIsOpenModal(true)}
          >
            <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
          </button>
        </div>
        {totalLoadLoading ? (
          <Spinner />
        ) : labels.length !== 0 ? (
          <LineChart datasets={datasets} labels={labels} />
        ) : (
          <p className="text-sm">データがありません</p>
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

export default TotalLoadSection
