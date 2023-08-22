import { faCalculator } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClockIcon } from '@heroicons/react/24/solid'

import Tag from '@/components/atoms/Tag'
import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import type {
  GetNoteQuery,
  Training,
} from '@/graphql/generated/operations-type'
import useNoteIdStore from '@/store/note/noteId'
import createTrainingSummary from '@/utils/notes/createTrainingSummary'

type Props = {
  noteData?: GetNoteQuery
  className?: string
  datetime: string
}

const SummarySection = ({ noteData, className, datetime }: Props) => {
  const noteId = useNoteIdStore((state) => state.noteId)
  const summaries = createTrainingSummary(
    (noteData?.note?.trainings ?? []) as Training[]
  )
  return (
    <Section className={className}>
      <TitleWithIcon as="h2" icon={<FontAwesomeIcon icon={faCalculator} />}>
        要約
      </TitleWithIcon>

      {noteId ? (
        summaries?.length !== 0 ? (
          <div className="space-y-3">
            <p className="pl-1 text-sm flex items-center gap-2">
              <ClockIcon className="w-6 h-6 text-indigo-800" />
              作成時刻: {datetime}
            </p>
            {summaries?.map((summary, index) => (
              <div
                key={index}
                className="text-sm flex items-center gap-2 justify-between"
              >
                <Tag>{summary.part}</Tag>
                <div className="whitespace-nowrap flex gap-2 items-baseline">
                  <p>
                    種目数:{' '}
                    <span
                      className="text-base font-bold"
                      data-testid="totalTrainings"
                    >
                      {summary.totalTrainings}
                    </span>
                  </p>{' '}
                  /
                  <p>
                    総負荷量:{' '}
                    <span className="text-base font-bold">
                      {summary.totalLoad}
                    </span>{' '}
                    kg
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">トレーニングを追加してください</p>
        )
      ) : (
        <p className="text-sm">ノートがありません</p>
      )}
    </Section>
  )
}

export default SummarySection
