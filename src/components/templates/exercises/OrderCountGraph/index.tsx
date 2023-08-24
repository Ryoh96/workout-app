import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassCircleIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import PieChart from '@/components/organisms/PieChart'
import ExerciseFilterModal from '@/components/templates/modal/ExerciseFilterModal'
import ShowDatasetModal from '@/components/templates/modal/ShowDatasetModal'
import { useGetAllTrainingsInNoteQuery } from '@/graphql/generated/operations-csr'
import { dateFormat } from '@/utils/dateFormat'
import { ManipulationError } from '@/utils/errors'
import getOrdersGraphData from '@/utils/exercise/getOrdersGraphData'

type Props = {
  id: string
  className?: string
}

const OrderCountGraphContainer = ({ id, className }: Props) => {
  const { data: trainingsData, loading: trainingsLoading } =
    useGetAllTrainingsInNoteQuery({
      onError: (error) => {
        if (error instanceof ManipulationError) {
          toast.error(error.message)
          return
        }
        console.error(error)
      },
    })
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const [span, setSpan] = useState(10)

  const [datasets, labels, ordersData] = getOrdersGraphData(
    id,
    trainingsData,
    span
  )
  const [isOpenDatasetModal, setIsOpenDatasetModal] = useState(false)

  return (
    <>
      <Presentational
        className={className}
        setIsOpenDatasetModal={setIsOpenDatasetModal}
        setIsOpenFilterModal={setIsOpenFilterModal}
        span={span}
        datasets={datasets}
        labels={labels}
        trainingsLoading={trainingsLoading}
      />
      <ExerciseFilterModal
        isOpen={isOpenFilterModal}
        setIsOpen={setIsOpenFilterModal}
        setSpan={setSpan}
        span={span}
      />
      <ShowDatasetModal
        title="種目目の推移"
        isOpen={isOpenDatasetModal}
        setIsOpen={setIsOpenDatasetModal}
        content={
          <table className="w-full border-collapse border">
            <tr className="bg-indigo-100 text-indigo-900 font-bold">
              <th className="p-3">日付</th>
              <td className="p-3 text-right">種目目</td>
            </tr>
            {ordersData.map((dataset, index) => (
              <tr key={index} className="border-b">
                <th className="px-2 py-3 mr-4 whitespace-nowrap  text-blue-900 ">
                  {dateFormat(new Date(dataset.date), true)}
                </th>
                <td className="px-6 w-3/5 text-right whitespace-nowrap">{`${
                  (dataset.order ?? 0) + 1
                }`}</td>
              </tr>
            ))}
          </table>
        }
      />
    </>
  )
}

type PresentationalProps = {
  className?: string
  setIsOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenDatasetModal: React.Dispatch<React.SetStateAction<boolean>>
  span: number
  datasets: {
    label: string
    data: number[]
  }[]
  labels: string[]
  trainingsLoading: boolean
}
export const Presentational = ({
  className,
  setIsOpenDatasetModal,
  setIsOpenFilterModal,
  span,
  datasets,
  labels,
  trainingsLoading,
}: PresentationalProps) => {
  return (
    <Section variant="narrow" className={clsx(className)}>
      <div className="flex items-center justify-between mb-4 border-b-2 pl-3 pb-2 mx-1">
        <p className="whitespace-nowrap">種目目の割合</p>
        <button className="pr-2" onClick={() => setIsOpenFilterModal(true)}>
          <div className="text-xs pl-4"></div>

          <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
        </button>
      </div>

      {trainingsLoading ? (
        <Spinner />
      ) : datasets[0].data.length !== 0 ? (
        <>
          <div className="text-xs pl-4">
            <span>条件：</span>
            {span !== -1 ? <span>{span}日間</span> : <span>全期間</span>}
          </div>
          <div className="w-4/5 mx-auto">
            <PieChart datasets={datasets} labels={labels} />
          </div>
          <button
            className="flex items-center text-sm gap-1  text-orange-600 font-bold ml-auto pr-2"
            onClick={() => setIsOpenDatasetModal(true)}
          >
            <MagnifyingGlassCircleIcon className="w-5 h-5" />
            <p>数字で見る</p>
          </button>
        </>
      ) : (
        <p className="text-sm px-4">データがありません</p>
      )}
    </Section>
  )
}

export default OrderCountGraphContainer
