import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { currentDateState } from '@/recoil/currentDate'

const useCurrentDate = (date: Date) => {
  const setCurrentDate = useSetRecoilState(currentDateState)

  useEffect(() => {
    setCurrentDate(new Date(date))
  }, [date, setCurrentDate])
}

export default useCurrentDate
