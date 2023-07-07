import 'react-calendar/dist/Calendar.css'

import { CalendarIcon } from '@heroicons/react/24/solid'
import Calendar from 'react-calendar'
import { toast } from 'react-toastify'

import Modal from '@/components/organisms/Modal'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  handleChange?: (date?: Date) => Promise<any>
}

const SelectCalendarModal = ({
  isOpen,
  setIsOpen,
  setCurrentDate,
  handleChange,
}: Props) => {
  return (
    <Modal
      title="日付を選択"
      titleIcon={<CalendarIcon />}
      content={
        <Calendar
          onChange={async (date) => {
            if (date instanceof Date) {
              try {
                setCurrentDate(date)
                setIsOpen(false)
                await handleChange?.(date)
              } catch (error) {
                if (error instanceof Error) toast.error(error.message)
              }
            }
          }}
          formatDay={(_, date) => new Date(date).getDate().toString()}
        />
      }
      handlers={[
        {
          name: 'キャンセル',
          handleClick: () => setIsOpen(false),
        },
      ]}
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
    />
  )
}

export default SelectCalendarModal
