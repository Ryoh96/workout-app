import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

import ExerciseFilterModal from '@/components/templates/modal/ExerciseFilterModal'
import { useGetAllTrainingsInNoteQuery } from '@/graphql/generated/operations-csr'
import { ManipulationError } from '@/utils/errors'
import getOrders from '@/utils/exercise/getOrders'

type ContainerProps = {
  id: string
}

const OrderAverageDataContainer = ({ id }: ContainerProps) => {
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const [span, setSpan] = useState(30)
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

  const orders =
    span !== -1
      ? getOrders(id, trainingsData)
          ?.map((order) => order.order ?? 0)
          .slice(0, span)
      : getOrders(id, trainingsData)?.map((order) => order.order ?? 0)

  const ordersAverage = orders
    ? orders.reduce((acc, num) => acc + num, 0) / orders.length
    : 0

  return (
    <>
      <Presentational
        ordersAverage={ordersAverage}
        setIsOpenFilterModal={setIsOpenFilterModal}
        trainingsLoading={trainingsLoading}
      />
      <ExerciseFilterModal
        isOpen={isOpenFilterModal}
        setIsOpen={setIsOpenFilterModal}
        setSpan={setSpan}
        span={span}
      />
    </>
  )
}

type PresentationalProps = {
  ordersAverage: number
  setIsOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>
  trainingsLoading: boolean
}

export const Presentational = ({
  ordersAverage,
  setIsOpenFilterModal,
  trainingsLoading,
}: PresentationalProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <p>・平均種目目：</p>
        <p>
          {trainingsLoading ? (
            <div data-testid="skelton">
              <Skeleton width={180} className="ml-2" />
            </div>
          ) : (
            <span>
              <span
                className="text-base font-bold mx-1"
                data-testid="ordersAverage"
              >
                {Number.isNaN(ordersAverage)
                  ? '--'
                  : Number(ordersAverage + 1).toFixed(2)}
              </span>
              回
            </span>
          )}
        </p>
      </div>
      <button className="pr-2" onClick={() => setIsOpenFilterModal(true)}>
        <span className="sr-only">フィルター</span>
        <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
      </button>
    </div>
  )
}

export default OrderAverageDataContainer
