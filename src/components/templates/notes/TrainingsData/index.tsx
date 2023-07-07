import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClockIcon } from '@heroicons/react/24/solid'

import Section from '@/components/layouts/Section'
import HorizontalTable from '@/components/molecules/HorizontalTable'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import type {
  GetNoteQuery,
  Training,
} from '@/graphql/generated/operations-type'
import createTrainingSummary from '@/utils/notes/createTrainingSummary'
import makeNoteSummary from '@/utils/notes/makeNoteSummary'

type Props = {
  className?: string
  datetime: string
  noteData: GetNoteQuery | undefined
}

const TrainingsData = ({ className, datetime, noteData }: Props) => {
  const trainingSummaries = createTrainingSummary(
    (noteData?.note?.trainings ?? []) as Training[]
  )
  return (
    <div className={className}>
      <Section className="mb-6">
        <TitleWithIcon icon={<ClockIcon />} as="h3">
          ノート作成時刻
        </TitleWithIcon>
        <p className="pl-1 flex items-center gap-2">・{datetime}</p>
      </Section>
      <Section>
        <TitleWithIcon
          icon={<FontAwesomeIcon icon={faDumbbell} className="w-6 h-6 mt-1" />}
          as="h3"
          className=""
        >
          部位ごとのデータ
        </TitleWithIcon>
        <div className="space-y-6">
          {noteData && noteData.note && trainingSummaries.length !== 0 ? (
            trainingSummaries.map((summary, index) => (
              <div key={index} className="space-y-1">
                <HorizontalTable
                  title={summary.part}
                  data={makeNoteSummary([
                    {
                      heading: '種目数',
                      content: summary.totalTrainings,
                      unit: '個',
                    },
                    {
                      heading: '総負荷量',
                      content: summary.totalLoad,
                      unit: 'kg',
                    },
                    {
                      heading: '総セット数',
                      content: summary.totalSet,
                      unit: '回',
                    },
                    {
                      heading: '総レップ数',
                      content: summary.totalReps,
                      unit: '回',
                    },
                  ])}
                />
              </div>
            ))
          ) : (
            <p>データがありません</p>
          )}
        </div>
      </Section>
    </div>
  )
}

export default TrainingsData
