import {
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Link from 'next/link'
import { forwardRef, useState } from 'react'

import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import HorizontalTable from '@/components/molecules/HorizontalTable'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import ExerciseFilterModal from '@/components/templates/modal/ExerciseFilterModal'
import type { Round } from '@/graphql/generated/operations-type'
import type { StatData } from '@/types'
import { dateFormat } from '@/utils/dateFormat'
import makeRoundsSummary from '@/utils/makeRoundsSummary'

type Props = {
  normalizedData?: StatData
  loading: boolean
}

const ExerciseNoteSection = forwardRef<HTMLDivElement, Props>(
  function ExerciseNoteSection({ normalizedData, loading }, ref) {
    const [span, setSpan] = useState(30)
    const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)

    const data = [...(normalizedData ?? [])].reverse().slice(0, span)

    return (
      <>
        <Section ref={ref}>
          <TitleWithIcon as="h2" icon={<BookOpenIcon className="mt-1" />}>
            ノート
          </TitleWithIcon>
          {loading ? (
            <Spinner />
          ) : data.length !== 0 ? (
            <>
              <div className="flex items-center justify-between px-2 mb-4">
                <p className="text-sm">期間: {span}日間</p>
                <button
                  className="pr-2"
                  onClick={() => setIsOpenFilterModal(true)}
                >
                  <AdjustmentsHorizontalIcon className="w-6 h-6 text-indigo-800" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-8">
                {data.map((datum, index) => (
                  <div
                    key={index}
                    className="relative w-full  max-w-sm mx-auto"
                  >
                    <HorizontalTable
                      index={index + 1}
                      key={index}
                      title={dateFormat(new Date(datum.date as string), true)}
                      data={makeRoundsSummary(datum.rounds as Round[])}
                    />
                    <Link
                      href={`/notes/${format(
                        new Date(datum.date as string),
                        'yyyy-MM-dd'
                      )}`}
                      className="absolute top-2 right-2"
                    >
                      <MagnifyingGlassIcon className="w-6 h-6 text-indigo-800" />
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm">データがありません</p>
          )}
        </Section>
        <ExerciseFilterModal
          isOpen={isOpenFilterModal}
          setIsOpen={setIsOpenFilterModal}
          setSpan={setSpan}
          span={span}
        />
      </>
    )
  }
)

export default ExerciseNoteSection
