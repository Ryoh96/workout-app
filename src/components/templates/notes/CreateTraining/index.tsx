import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import Section from '@/components/layouts/Section'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import ComboBox from '@/components/organisms/ComboBox'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import AddExerciseModal from '@/components/templates/modal/AddExerciseModal'
import useCreateTraining from '@/hooks/pages/note/useCreateTraining'
import useExerciseName from '@/hooks/pages/note/useExerciseName'
import useDeleteExerciseModalStore from '@/store/modal/deleteExerciseModal'
import useNoteIdStore from '@/store/note/noteId'
import type { ComboBoxOption } from '@/types'
import { ManipulationError } from '@/utils/errors'

import DeleteExerciseModal from '../../modal/DeleteModal/DeleteExerciseModal'

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
  } = useExerciseName(partsOptions[0]?.id as string)

  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState(false)
  const noteId = useNoteIdStore((state) => state.noteId)

  const [exerciseOptions, setExerciseOptions] = useState(
    exerciseNames?.part?.exercises ?? []
  )

  const [parts, setParts] = useState<ComboBoxOption>(partsOptions[0])

  const notify = (message: string) => toast(message)

  const handleChange = async (id: string) => {
    try {
      const part = partsOptions.find((part) => part.id === id)
      if (!part) throw new ManipulationError('部位が見つかりません')
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

  const setIsOpenDeleteExerciseModal = useDeleteExerciseModalStore(
    (state) => state.setIsOpen
  )

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
          icon={<FontAwesomeIcon icon={faDumbbell} className="w-6 h-6 mt-1" />}
          as="h2"
          className="flex items-center gap-2"
        >
          新規トレーニング
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
              <div className="flex items-center w-full gap-2">
                <ComboBox
                  options={exerciseOptions}
                  selected={exercise}
                  setSelected={
                    setExercise as React.Dispatch<
                      React.SetStateAction<ComboBoxOption>
                    >
                  }
                  placeholder={
                    exerciseOptions.length === 0
                      ? '右の点々ボタンから種目を追加'
                      : '種目を選択'
                  }
                />
                <div className="mt-2" data-testid="exerciseMenu">
                  <DropDownWithButton
                    icon={<EllipsisVerticalIcon className="w-6 h-6" />}
                    menuItems={[
                      {
                        icon: <PlusIcon className="text-indigo-800 w-6 h-6" />,
                        name: '種目の追加',
                        handleClick: () => setIsOpenAddExerciseModal(true),
                      },
                      {
                        icon: <TrashIcon className="text-indigo-800 w-6 h-6" />,
                        name: '種目の削除',
                        handleClick: () => setIsOpenDeleteExerciseModal(true),
                      },
                    ]}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center h-10">
                <Spinner variant="small" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleCreateTraining}
            loading={createTrainingMutationLoading}
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
      {exercise && (
        <DeleteExerciseModal
          deleteName={exercise.name}
          deleteId={exercise.id as string}
          onCompleted={() => {
            setExercise(null)
            setExerciseOptions((prev) =>
              prev.filter((exerciseOption) => exerciseOption.id !== exercise.id)
            )
            onCompleted()
          }}
        />
      )}
    </>
  )
}

export default CreateTraining
