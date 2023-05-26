import { useEffect, useLayoutEffect, useState } from 'react'
import { Id, toast, ToastContainer } from 'react-toastify'

import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import Toast from '@/components/atoms/Toast'
import Section from '@/components/layouts/Section'
import AddIconButton from '@/components/molecules/AddIconButton'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import AddExerciseForm from '@/components/organisms/AddExerciseForm'
import ComboBox from '@/components/organisms/ComboBox'
import Modal from '@/components/organisms/Modal'
import {
  useAddExerciseByPartMutation,
  useGetExerciseNamesByPartLazyQuery,
} from '@/graphql/generated/operations-csr'
import type { ComboBoxOption } from '@/types'

type Props = {
  handleClick: () => void
  parts: ComboBoxOption
  setParts: React.Dispatch<React.SetStateAction<ComboBoxOption>>
  partsOptions: ComboBoxOption[]
  exercise: ComboBoxOption
  setExercise: React.Dispatch<React.SetStateAction<ComboBoxOption>>
  exerciseOptionsInit: ComboBoxOption[]
  disabledButton: boolean
}

const CreateTrainingForm = ({
  handleClick,
  parts,
  setParts,
  exercise,
  setExercise,
  partsOptions,
  exerciseOptionsInit,
  disabledButton,
}: Props) => {
  const [isCreateTrainingModalOpen, setIsCreateTrainingModalOpen] =
    useState(false)
  const closeCreateTrainingModal = () => setIsCreateTrainingModalOpen(false)
  const openCreateTrainingModal = () => setIsCreateTrainingModalOpen(true)

  const [exerciseOptions, setExerciseOptions] = useState(exerciseOptionsInit)

  const [
    addExerciseByPartMutation,
    {
      data: addExerciseData,
      loading: addExerciseLoading,
      error: addExerciseError,
    },
  ] = useAddExerciseByPartMutation({
    onCompleted() {
      refetch()
    },
  })

  const [
    getExerciseName,
    {
      data: getExerciseNameData,
      loading: getExerciseNameLoading,
      error: getExerciseNameError,
      refetch,
    },
  ] = useGetExerciseNamesByPartLazyQuery()

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

  useEffect(() => {
    if (getExerciseNameData) {
      const newExercises =
        getExerciseNameData.part?.exercises?.map((exercise) => ({
          id: exercise.id,
          name: exercise.name,
        })) ?? []

      setExerciseOptions(newExercises)
      setExercise(newExercises[newExercises.length - 1])
    }
  }, [getExerciseNameData, setExercise])

  return (
    <Section>
      <Title as="h2">新規作成</Title>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-sm whitespace-nowrap mt-1 pl-1 text-sky-800 font-bold">
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
          <p className="text-sm whitespace-nowrap mt-1 pl-1 text-sky-800 font-bold">
            種目:
          </p>

          {!getExerciseNameLoading ? (
            <ComboBox
              options={exerciseOptions}
              selected={exercise}
              setSelected={setExercise}
              placeholder="「種目の追加」を押してください"
            />
          ) : (
            <div className="flex items-center h-10">
              <Spinner variant="small" />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <AddIconButton text="種目の追加" onClick={openCreateTrainingModal} />
          <Modal
            title="種目の追加"
            content={
              <AddExerciseForm
                onValid={async (data) => {
                  await toast.promise(
                    addExerciseByPartMutation({
                      variables: {
                        name: data.exercise,
                        partId: data.part,
                      },
                    }),
                    {
                      error: {
                        render({ data }) {
                          //@ts-ignore
                          return `${data.message}`
                        },
                      },
                      success: '登録しました',
                    },
                    {
                      autoClose: 3000,
                    }
                  )
                }}
                onInvalid={(e) => {
                  console.error(e)
                  e.part
                }}
                partsOptions={partsOptions}
                onCancel={closeCreateTrainingModal}
                id={''}
                selected={`${parts.id}`}
              />
            }
            isOpen={isCreateTrainingModalOpen}
            closeModal={closeCreateTrainingModal}
          />
        </div>
      </div>
      {addExerciseLoading && (
        <p>
          <p>Submitting...</p>
        </p>
      )}
      <div className="flex justify-center mt-8">
        <Button onClick={handleClick} disabled={disabledButton}>
          トレーニング追加
        </Button>
      </div>
      <Toast />
    </Section>
  )
}

export default CreateTrainingForm
