import Button from '@/components/atoms/Button'
import Section from '@/components/layouts/Section'
import type {
  GetNoteQuery,
  Training,
} from '@/graphql/generated/operations-type'
import useAddRound from '@/hooks/pages/editNote/useAddRound'
import useDeleteTrainingModalStore from '@/store/modal/deleteTrainingModal'
import useIsEditingStore from '@/store/note/isEditing'
import useDeleteTrainingIdStore from '@/store/training/deleteTrainingId'
import useEditedTrainingIdStore from '@/store/training/editedTrainingId'
import useLastTrainingIdStore from '@/store/training/lastTrainingId'

import ExerciseHeader from './ExerciseHeader'
import RoundDoing from './RoundDoing'
import TrainingResults from './TrainingResults'

type Props = {
  training: NonNullable<NonNullable<GetNoteQuery['note']>['trainings']>[number]
  onCompleted: () => void
  index: number
}

const TrainingItem = ({ onCompleted, training, index }: Props) => {
  const [handleAddRound, addRoundMutationLoading] = useAddRound(onCompleted)

  const { editedTrainingId, setEditedTrainingId } = useEditedTrainingIdStore(
    (state) => ({
      editedTrainingId: state.editedTrainingId,
      setEditedTrainingId: state.setEditedTrainingId,
    })
  )
  const { lastTrainingId, setLastTrainingId } = useLastTrainingIdStore(
    (state) => ({
      lastTrainingId: state.lastTrainingId,
      setLastTrainingId: state.setLastTrainingId,
    })
  )

  const { isEditing, setIsEditing } = useIsEditingStore((state) => ({
    isEditing: state.isEditing,
    setIsEditing: state.setIsEditing,
  }))

  const setIsOpenDeleteTrainingModal = useDeleteTrainingModalStore(
    (state) => state.setIsOpen
  )

  const setDeleteTrainingId = useDeleteTrainingIdStore(
    (state) => state.setDeleteId
  )

  const addTraining = async () => {
    setLastTrainingId(null)
  }

  return (
    <>
      <li>
        {training.id && (
          <Section key={training.id}>
            <ExerciseHeader
              training={training as Training}
              removeTraining={() => {
                setDeleteTrainingId(training.id)
                setIsOpenDeleteTrainingModal(true)
              }}
              editTraining={() => {
                setIsEditing(false)
                setEditedTrainingId(training.id)
              }}
              index={index}
              onCompleted={onCompleted}
            />
            <TrainingResults
              training={training as Training}
              id={editedTrainingId}
            />
            {training.id === editedTrainingId && (
              <div>
                {isEditing ? (
                  <RoundDoing
                    training={training as Training}
                    loading={addRoundMutationLoading}
                    onValid={(data) => {
                      handleAddRound(training.id, data, training.exercise?.id)
                    }}
                    handleCancel={() => {
                      setIsEditing(false)
                    }}
                  />
                ) : (
                  <div className="flex items-center gap-2 justify-center mt-4">
                    <Button
                      onClick={() => setIsEditing(true)}
                      loading={addRoundMutationLoading}
                    >
                      セット追加
                    </Button>
                    {training.id === lastTrainingId && (
                      <Button
                        onClick={() => {
                          addTraining()
                        }}
                        loading={addRoundMutationLoading}
                      >
                        次の種目
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </Section>
        )}
      </li>
    </>
  )
}

export default TrainingItem
