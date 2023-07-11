import {
  faClock,
  faDumbbell,
  faHistory,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { format, isSameDay, subDays } from 'date-fns'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import Toast from '@/components/atoms/Toast'
import Section from '@/components/layouts/Section'
import HorizontalTable from '@/components/molecules/HorizontalTable'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import AccordionList from '@/components/organisms/AccordionList'
import SelectCalendarModal from '@/components/templates/modal/SelectCalendarModal'
import { useGetNotesQuery } from '@/graphql/generated/operations-csr'
import type { Round } from '@/graphql/generated/operations-type'
import { currentDateState } from '@/recoil/currentDate'
import { dateFormat } from '@/utils/dateFormat'
import makeRoundsSummary from '@/utils/makeRoundsSummary'

const Home: NextPage = () => {
  const today = useMemo(() => new Date(), [])
  const thirtyDaysAgo = subDays(new Date(today), 30)

  const { data, loading } = useGetNotesQuery({
    variables: {
      since: thirtyDaysAgo.toISOString(),
      until: today.toISOString(),
    },
    onError: (error) => console.error(error.message),
  })

  const [isOpenCalenderModal, setIsOpenCalenderModal] = useState(false)

  const [currentDate, setCurrentDate] = useRecoilState(currentDateState)
  const router = useRouter()

  if (loading) return <Spinner />
  return (
    <>
      <>{console.log(data?.notes)}</>
      <SelectCalendarModal
        isOpen={isOpenCalenderModal}
        setIsOpen={setIsOpenCalenderModal}
        setCurrentDate={setCurrentDate}
        handleChange={async (date) =>
          date && router.push(`/notes/${format(date, 'yyyy-MM-dd')}`)
        }
      />
      <Toast />
    </>
  )
}

export default Home
