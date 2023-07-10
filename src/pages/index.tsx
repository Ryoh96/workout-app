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


  const normalizedData = data?.notes?.map((note) => {
    return {
      title: dateFormat(new Date(note.date)) as string,
      titleIcon: <FontAwesomeIcon icon={faClock} />,
      content: (
        <div className="divide-y-2 divide-gray-100 space-y-3 ">
          <>
            {note.trainings?.map((training, index) => (
              <div
                className="pt-2 first:pt-0  w-full  max-w-sm mx-auto"
                key={index}
              >
                <HorizontalTable
                  index={index + 1}
                  title={training.exercise?.name}
                  data={makeRoundsSummary(training.rounds as Round[])}
                />
              </div>
            ))}
          </>
        </div>
      ),
      tags: Array.from(
        new Set(
          note.trainings?.flatMap(
            (training) =>
              training.exercise?.parts?.flatMap((part) => part.name) ?? []
          )
        )
      ),
    }
  })

  const hasNote = (day: string) => {
    return isSameDay(new Date(), new Date(day))
  }

  const [isOpenCalenderModal, setIsOpenCalenderModal] = useState(false)

  const [currentDate, setCurrentDate] = useRecoilState(currentDateState)
  const router = useRouter()

  return (
    <>
      <div className="h-full space-y-3 self-start">
        <Title as="h1">Workout Note</Title>
        <div className="md:flex gap-3">
          <Section className="w-full">
            <TitleWithIcon as="h2" icon={<BookOpenIcon />}>
              ノート管理
            </TitleWithIcon>
            {!data?.notes?.[0]?.date ||
              (!hasNote(data?.notes?.[0].date) && (
                <p className="pb-2 text-sm">
                  今日はまだノートを作成していません。
                </p>
              ))}
            <div className="flex gap-2 justify-center mt-3">
              <Link href={`/notes/${format(new Date(), 'yyyy-MM-dd')}`}>
                <Button variant="important">ノートの追加</Button>
              </Link>
              <Button
                onClick={() => setIsOpenCalenderModal(true)}
                className="py-2"
              >
                ノートを見る
              </Button>
            </div>
          </Section>
          <Section className="w-full">
            <TitleWithIcon
              as="h2"
              icon={<FontAwesomeIcon icon={faDumbbell} className="flex" />}
            >
              種目管理
            </TitleWithIcon>
            <p className="pb-2 text-sm">登録した種目のデータを見る</p>
            <div className="flex gap-2 justify-center mt-3">
              <Button onClick={() => router.push('/exercises')}>
                種目一覧へ
              </Button>
            </div>
          </Section>
        </div>
        <Section>
          <TitleWithIcon as="h2" icon={<FontAwesomeIcon icon={faHistory} />}>
            最近の記録
          </TitleWithIcon>
          {loading ? (
            <Spinner />
          ) : normalizedData ? (
            <AccordionList items={normalizedData} />
          ) : (
            <p>記録がありません</p>
          )}
        </Section>
      </div>
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
