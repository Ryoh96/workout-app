import type { SetterOrUpdater } from 'recoil'
import { useRecoilState, useSetRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Section from '@/components/layouts/Section'
import type {
  GetNoteQuery,
  GetPreviousTrainingsQuery,
  Training,
} from '@/graphql/generated/operations-type'
import useAddRound from '@/hooks/pages/editNote/useAddRound'
import usePreviousData from '@/hooks/pages/editNote/usePreviousData'
import type { UpsertRoundInput } from '@/libs/schema/upsertRound'
import { deleteTrainingModalState } from '@/recoil/Modal/DeleteTrainingModal'
import { isEditingState } from '@/recoil/Note/isEditing'
import { deleteTrainingIdState } from '@/recoil/Training/deleteTrainingId'
import { editedTrainingIdState } from '@/recoil/Training/editedTrainingId'
import { lastTrainingIdState } from '@/recoil/Training/lastTrainingId'

import ExerciseHeader from './ExerciseHeader'
import RoundDoing from './RoundDoing'
import TrainingResults from './TrainingResults'

type Props = {
  training: NonNullable<NonNullable<GetNoteQuery['note']>['trainings']>[number]
  onCompleted: () => void
  index: number
}

const defaultValues = {
  weight: 0,
  repetition: 0,
  minutes: 0,
  seconds: 0,
  memo: '',
  pin: false,
}
const TrainingItemContainer = ({ onCompleted, training, index }: Props) => {
  const [handleAddRound, addRoundMutationLoading] = useAddRound(onCompleted)
  const { previousTotalLoad, previousData, previousLoading } = usePreviousData(
    training.id
  )

  const [editedTrainingId, setEditedTrainingId] = useRecoilState(
    editedTrainingIdState
  )
  const [lastTrainingId, setLastTrainingId] =
    useRecoilState(lastTrainingIdState)

  const [isEditing, setIsEditing] = useRecoilState(isEditingState)
  console.log(8999, previousData)
  return (
    <Presentational
      training={training}
      handleAddRound={handleAddRound}
      addRoundMutationLoading={addRoundMutationLoading}
      previousLoading={previousLoading}
      previousTotalLoad={previousTotalLoad}
      index={index}
      previousData={previousData}
      onCompleted={onCompleted}
      editedTrainingId={editedTrainingId}
      lastTrainingId={lastTrainingId}
      isEditing={isEditing}
      setEditedTrainingId={setEditedTrainingId}
      setIsEditing={setIsEditing}
      setLastTrainingId={setLastTrainingId}
    />
  )
}

type PresentationalProps = {
  handleAddRound: (
    trainingId: string,
    { weight, repetition, minutes, seconds, unit, memo, pin }: UpsertRoundInput,
    exerciseId: string | undefined
  ) => Promise<void>
  addRoundMutationLoading: boolean
  previousLoading: boolean
  previousTotalLoad: number
  previousData?: GetPreviousTrainingsQuery
  editedTrainingId: string | null
  lastTrainingId: string | null
  isEditing: boolean
  setEditedTrainingId: SetterOrUpdater<string | null>
  setLastTrainingId: SetterOrUpdater<string | null>
  setIsEditing: SetterOrUpdater<boolean>
} & Props

export const Presentational = ({
  training,
  handleAddRound,
  addRoundMutationLoading,
  previousLoading,
  previousTotalLoad,
  previousData,
  index,
  onCompleted,
  editedTrainingId,
  lastTrainingId,
  isEditing,
  setEditedTrainingId,
  setIsEditing,
  setLastTrainingId,
}: PresentationalProps) => {
  const setIsOpenDeleteTrainingModal = useSetRecoilState(
    deleteTrainingModalState
  )

  const setDeleteTrainingId = useSetRecoilState(deleteTrainingIdState)

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
              previousTotalLoad={previousTotalLoad}
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
                    defaultValues={defaultValues}
                    previousData={previousData}
                    previousLoading={previousLoading}
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
                      disabled={addRoundMutationLoading}
                    >
                      セット追加
                    </Button>
                    {training.id === lastTrainingId && (
                      <Button
                        onClick={() => {
                          addTraining()
                        }}
                        disabled={addRoundMutationLoading}
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

export default TrainingItemContainer
