import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import AddIconButton from '@/components/molecules/AddIconButton'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import ComboBox from '@/components/organisms/ComboBox'
import AddExerciseModal from '@/components/templates/modal/AddExerciseModal'
import useCreateTraining from '@/hooks/pages/editNote/useCreateTraining'
import useExerciseName from '@/hooks/pages/editNote/useExerciseName'
import { noteIdState } from '@/recoil/Note/noteId'
import type { ComboBoxOption } from '@/types'

type Props = {
  onCompleted: () => void
  partsOptions: ComboBoxOption[]
  existingTrainings: Set<string | undefined>
}

 const CreateTraining = ({
  partsOptions,
  onCompleted,
  existingTrainings,
}: Props) => {
  const {
    exercise,
    setExercise,
    exerciseNames,
    getExerciseName,
    exerciseNameLoading,
    refetchExerciseNames,
  } = useExerciseName(partsOptions[0].id as string)

  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState(false)
  const noteId = useRecoilValue(noteIdState)

  const [exerciseOptions, setExerciseOptions] = useState(
    exerciseNames?.part?.exercises ?? []
  )
  const [parts, setParts] = useState<ComboBoxOption>(partsOptions[0])

  const notify = (message: string) => toast(message)

  const handleChange = async (id: string) => {
    try {
      const part = partsOptions.find((part) => part.id === id)
      if (!part) throw new Error('Part not found')
      setParts(part)
      await getExerciseName({
        variables: {
          partIds: `${id}`,
        },
      })
    } catch (error) {
      if (typeof error === 'string') notify(error)
      console.error(error)
    }
  }

  const [handleCreateTraining, createTrainingMutationLoading] =
    useCreateTraining(noteId, onCompleted, existingTrainings, exercise)

  useEffect(() => {
    if (exerciseNames) {
      const newExercises =
        exerciseNames.part?.exercises?.map((exercise) => ({
          id: exercise.id,
          name: exercise.name,
        })) ?? []

      setExerciseOptions(newExercises)
      setExercise(newExercises[newExercises.length - 1])
    }
  }, [exerciseNames, setExercise])

  return (
    <>
      <Section>
        <TitleWithIcon
          icon={<FontAwesomeIcon icon={faDumbbell} className='w-6 h-6 mt-1'/>}
          as="h2"
          className="flex items-center gap-2"
        >
          新規作成
        </TitleWithIcon>
        <div className="space-y-4">
          <div className="flex items-center gap-3 w-full">
            <p className="text-sm whitespace-nowrap mt-1 pl-1 text-indigo-800 font-bold">
              部位:
            </p>
            <SelectBoxWithLabel
              label="部位"
              options={partsOptions.map((option) => ({
                name: option.name,
                value: `${option.id}`,
              }))}
              variant="large"
              labelVisible={false}
              defaultValue={parts.name}
              value={parts.id}
              handleChange={(id) => handleChange(id)}
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm whitespace-nowrap mt-1 pl-1 text-indigo-800 font-bold">
              種目:
            </p>

            {!exerciseNameLoading ? (
              <ComboBox
                options={exerciseOptions}
                selected={exercise}
                setSelected={
                  setExercise as React.Dispatch<
                    React.SetStateAction<ComboBoxOption>
                  >
                }
                placeholder="「種目の追加」を押してください"
              />
            ) : (
              <div className="flex items-center h-10">
                <Spinner variant="small" />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <AddIconButton
              text="種目の追加"
              onClick={() => setIsOpenAddExerciseModal(true)}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleCreateTraining}
            disabled={createTrainingMutationLoading}
          >
            トレーニング追加
          </Button>
        </div>
      </Section>
      <AddExerciseModal
        isOpen={isOpenAddExerciseModal}
        setIsOpen={setIsOpenAddExerciseModal}
        onCompleted={() =>
          refetchExerciseNames({ partIds: parts.id as string })
        }
        partsOptions={partsOptions}
        parts={parts}
      />
    </>
  )
}

export default CreateTraining