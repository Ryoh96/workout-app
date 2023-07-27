import { useEffect } from 'react'

import useCurrentDateStore from '@/store/date/currentDate'

const useCurrentDate = (date: Date) => {
  const setCurrentDate = useCurrentDateStore((state) => state.setCurrentDate)

  useEffect(() => {
    setCurrentDate(new Date(date))
  }, [date, setCurrentDate])
}

export default useCurrentDate
