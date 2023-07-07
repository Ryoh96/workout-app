import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import type { GetNoteQuery } from '@/graphql/generated/operations-type'

import TrainingItem from './TrainingItem'

type Props = {
  noteData: GetNoteQuery | undefined
  onCompleted: () => void
}

const TrainingList = ({ noteData, onCompleted }: Props) => {
  return (
    <Section>
      <TitleWithIcon
        as="h2"
        icon={
          <FontAwesomeIcon icon={faFireFlameCurved} className="!text-red-600" />
        }
      >
        トレーニング
      </TitleWithIcon>
      <ul className="">
        {noteData?.note?.trainings?.map((training, index) => (
          <TrainingItem
            key={training.id}
            training={training}
            onCompleted={onCompleted}
            index={index}
          />
        ))}
      </ul>
    </Section>
  )
}

export default TrainingList
