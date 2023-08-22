import {
  faClock,
  faDumbbell,
  faHistory,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { format, subDays } from 'date-fns'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'

import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import Toast from '@/components/atoms/Toast'
import Section from '@/components/layouts/Section'
import HorizontalTable from '@/components/molecules/HorizontalTable'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import AccordionList from '@/components/organisms/AccordionList'
import SelectCalendarModal from '@/components/templates/modal/SelectCalendarModal'
import { APP_NAME } from '@/constants'
import { useGetNotesQuery } from '@/graphql/generated/operations-csr'
import type { Round } from '@/graphql/generated/operations-type'
import useCurrentDateStore from '@/store/date/currentDate'
import { dateFormat } from '@/utils/dateFormat'
import makeRoundsSummary from '@/utils/makeRoundsSummary'

const Home: NextPage = () => {
  const { status } = useSession()

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

  const [isOpenCalenderModal, setIsOpenCalenderModal] = useState(false)

  const setCurrentDate = useCurrentDateStore((state) => state.setCurrentDate)
  const router = useRouter()

  return (
    <>
      <div className="h-full space-y-3 self-start">
        <Title as="h1">{APP_NAME}</Title>
        <div className="md:flex gap-3">
          <Section className="w-full">
            <TitleWithIcon as="h2" icon={<BookOpenIcon />}>
              ノート管理
            </TitleWithIcon>
            <p className="pb-2 text-sm">今までの記録とノート新規作成</p>

            <div className="flex gap-2 justify-center mt-3">
              <Link href={`/notes/${format(new Date(), 'yyyy-MM-dd')}`}>
                <Button variant="important" loading={status === 'loading'}>
                  ノートの追加
                </Button>
              </Link>
              <Button
                onClick={() => setIsOpenCalenderModal(true)}
                className="py-2"
                loading={status === 'loading'}
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
              <Button
                onClick={() => router.push('/exercises')}
                loading={status === 'loading'}
              >
                種目一覧
              </Button>
            </div>
          </Section>
        </div>
        <Section>
          <TitleWithIcon as="h2" icon={<FontAwesomeIcon icon={faHistory} />}>
            最近の記録
          </TitleWithIcon>
          {status === 'authenticated' && loading ? (
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
