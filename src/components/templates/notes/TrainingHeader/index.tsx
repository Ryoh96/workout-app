import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { addDays, format, subDays } from 'date-fns'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import Section from '@/components/layouts/Section'
import SelectCalendarModal from '@/components/templates/modal/SelectCalendarModal'
import useCurrentDateStore from '@/store/date/currentDate'
import { dateFormat } from '@/utils/dateFormat'

const TrainingHeader = () => {
  const router = useRouter()
  const [isOpenCalenderModal, setIsOpenCalenderModal] = useState(false)
  const { currentDate, setCurrentDate } = useCurrentDateStore((state) => ({
    currentDate: state.currentDate,
    setCurrentDate: state.setCurrentDate,
  }))

  const formattedCurrentDate = useMemo(
    () => dateFormat(currentDate),
    [currentDate]
  )
  const handleGetNoteByDate = async (day: 'prev' | 'next') => {
    const date =
      day === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1)
    setCurrentDate(date)

    router.push(`/notes/${format(date, 'yyyy-MM-dd')}`)
  }

  return (
    <>
      <Section>
        <div className="relative">
          <div className="flex items-center justify-between  mx-auto">
            <button onClick={() => handleGetNoteByDate('prev')}>
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="sr-only">前の日付</span>
            </button>
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsOpenCalenderModal(true)}
            >
              <p
                className="font-bold text-red-600 text-lg lg:text-xl"
                data-testid="currentDate"
              >
                {formattedCurrentDate}
              </p>
              <ChevronDownIcon
                className="w-4 h-4 mt-1"
                aria-label="カレンダーを開く"
              />
            </button>
            <button onClick={() => handleGetNoteByDate('next')}>
              <ChevronRightIcon className="w-5 h-5" />
              <span className="sr-only">次の日付</span>
            </button>
          </div>
        </div>
      </Section>
      <SelectCalendarModal
        isOpen={isOpenCalenderModal}
        setIsOpen={setIsOpenCalenderModal}
        setCurrentDate={setCurrentDate}
        handleChange={async (date) =>
          date && router.push(`/notes/${format(date, 'yyyy-MM-dd')}`)
        }
      />
    </>
  )
}

export default TrainingHeader
