import { ChartPieIcon } from '@heroicons/react/24/solid'

import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import type {
  GetNoteQuery,
  Training,
} from '@/graphql/generated/operations-type'
import { datetimeFormat } from '@/utils/dateFormat'
import createTrainingSummary from '@/utils/notes/createTrainingSummary'

import TrainingsData from '../TrainingsData'

type Props = {
  noteData: GetNoteQuery | undefined
}

const TrainingsDataSection = ({ noteData }: Props) => {
  const trainingSummaries = createTrainingSummary(
    (noteData?.note?.trainings ?? []) as Training[]
  )

  return (
    <Section>
      <TitleWithIcon as="h2" icon={<ChartPieIcon />}>
        この日のデータ
      </TitleWithIcon>
      <div className="space-y-10">
        {noteData && noteData.note && trainingSummaries.length !== 0 ? (
          <TrainingsData
            datetime={datetimeFormat(new Date(noteData.note!.createdAt), true)}
            noteData={noteData}
          />
        ) : (
          <p>データがありません</p>
        )}
      </div>
    </Section>
  )
}

export default TrainingsDataSection
