import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { GraphQLClient } from 'graphql-request'
import type { GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

import Button from '@/components/atoms/Button'
import Toast from '@/components/atoms/Toast'
import Section from '@/components/layouts/Section'
import CreateTraining from '@/components/templates/common/CreateTraining'
import {
  DeleteSetModal,
  DeleteTrainingModal,
  EditRoundModal,
  ExerciseHeader,
  RoundDoing,
  RoundDone,
} from '@/components/templates/EditNote'
import type { Round } from '@/graphql/generated/operations-csr'
import {
  useCreateOrGetNoteIdMutation,
  useGetNoteByIdLazyQuery,
} from '@/graphql/generated/operations-csr'
import { getSdk } from '@/graphql/generated/operations-ssg'
import useAddRound from '@/hooks/pages/editNote/useAddRound'
import useCreateTraining from '@/hooks/pages/editNote/useCreateTraining'
import type { ComboBoxOption } from '@/types'
import type { DeepPartial } from '@/types/utils'

const defaultValues = {
  weight: 0,
  repetition: 0,
  minutes: 0,
  seconds: 0,
  memo: '',
  pin: false,
}

type Props = {
  partsOptions: ComboBoxOption[]
  exerciseOptions: ComboBoxOption[]
}

const Test = ({ partsOptions, exerciseOptions }: Props) => {
  const [noteId, setNoteId] = useState<string | null>(null)

  const [parts, setParts] = useState<ComboBoxOption>(partsOptions[0])
  const [exercise, setExercise] = useState<ComboBoxOption>(exerciseOptions[0])

  const [isEditing, setIsEditing] = useState(false)
  const [lastTrainingId, setLastTrainingId] = useState<string | null>(null)

  const [isOpenDeleteTrainingModal, setIsOpenDeleteTrainingModal] =
    useState(false)
  const [isOpenEditRoundModal, setIsOpenEditRoundModal] = useState(false)
  const [isOpenDeleteRoundModal, setIsOpenDeleteRoundModal] = useState(false)

  const [editedRound, setEditedRound] = useState<DeepPartial<Round> | null>(
    null
  )
  const [editedTrainingId, setEditedTrainingId] = useState<string | null>(null)

  const [deleteTrainingId, setDeleteTrainingId] = useState<string | null>(null)
  const [deleteRoundId, setDeleteRoundId] = useState<string | null>(null)

  const [getNoteQuery, { data: noteData, refetch }] = useGetNoteByIdLazyQuery()

  const [createOrGetNoteId, { data: createOrGetNoteIdData }] =
    useCreateOrGetNoteIdMutation()

  const [handleAddRound, addRoundMutationLoading] = useAddRound(
    noteId,
    refetch,
    setIsEditing
  )

  const [handleCreateTraining, createTrainingMutationLoading] =
    useCreateTraining(
      noteId,
      refetch,
      setIsEditing,
      setEditedTrainingId,
      setLastTrainingId,
      exercise
    )

  useEffect(() => {
    ;(async () => {
      await createOrGetNoteId()
    })()
  }, [])

  useEffect(() => {
    if (!createOrGetNoteIdData) return
    ;(async () => {
      await getNoteQuery({
        variables: {
          id: createOrGetNoteIdData.createOrGetNoteId.id,
        },
      })
    })()
  }, [createOrGetNoteIdData, getNoteQuery])

  useEffect(() => {
    if (!noteData) return
    setNoteId(noteData?.noteById.id)
  }, [noteData])

  const addTraining = async () => {
    setLastTrainingId(null)
  }

  const finishTraining = () => {
    setLastTrainingId(null)
    setIsEditing(false)
  }

  return (
    <>
      <ul>
        {noteData?.noteById.trainings?.map((training) => (
          <>
            <li key={training.id}>
              <Section key={training.id}>
                <ExerciseHeader
                  name={training.exercise?.name ?? ''}
                  totalLoad={
                    training.rounds?.reduce(
                      (accumulator, round) =>
                        accumulator + round.repetition * round.weight,
                      0
                    ) ?? 0
                  }
                  previousTotalLoad={700}
                  memo="僧帽筋に力が入らないように"
                  removeTraining={() => {
                    setDeleteTrainingId(training.id)
                    setIsOpenDeleteTrainingModal(true)
                  }}
                  editTraining={() => {
                    setIsEditing(false)
                    setEditedTrainingId(training.id)
                  }}
                />
                {training.rounds?.map((round, index) => (
                  <div key={index}>
                    <div className="flex ">
                      <RoundDone key={index} {...round} setCount={index + 1} />
                      {training.id === editedTrainingId && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditedRound(round)
                              setIsOpenEditRoundModal(true)
                            }}
                          >
                            <PencilSquareIcon className="h-6 w-6 text-sky-800" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteRoundId(round.id)
                              setIsOpenDeleteRoundModal(true)
                            }}
                          >
                            <TrashIcon className="h-6 w-6 text-sky-800" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {training.id === editedTrainingId && (
                  <div>
                    {isEditing ? (
                      <RoundDoing
                        createdAt={new Date().toISOString()}
                        title={`${(training.rounds?.length ?? 0) + 1}set`}
                        defaultValues={defaultValues}
                        onValid={(data) => {
                          handleAddRound(
                            training.id,
                            data,
                            training.exercise?.id
                          )
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
            </li>
          </>
        ))}
      </ul>
      {(lastTrainingId === null ||
        noteData?.noteById.trainings?.length === 0) && (
        <CreateTraining
          handleClick={handleCreateTraining}
          parts={parts}
          setParts={setParts}
          partsOptions={partsOptions}
          exercise={exercise}
          setExercise={setExercise}
          exerciseOptionsInit={exerciseOptions}
          disabledButton={createTrainingMutationLoading}
        />
      )}
      <Button onClick={finishTraining}>トップへ戻る</Button>
      <EditRoundModal
        noteId={noteId}
        editedRound={editedRound}
        refetch={refetch}
        setEditedRound={setEditedRound}
        setIsOpenEditRoundModal={setIsOpenEditRoundModal}
        isOpenEditRoundModal={isOpenEditRoundModal}
      />
      <DeleteTrainingModal
        deleteTrainingId={deleteTrainingId}
        noteId={noteId}
        refetch={refetch}
        setDeleteTrainingId={setDeleteTrainingId}
        isOpenDeleteTrainingModal={isOpenDeleteTrainingModal}
        setIsOpenDeleteTrainingModal={setIsOpenDeleteTrainingModal}
      />
      <DeleteSetModal
        deleteRoundId={deleteRoundId}
        noteId={noteId}
        refetch={refetch}
        setDeleteRoundId={setDeleteRoundId}
        isOpenDeleteRoundModal={isOpenDeleteRoundModal}
        setIsOpenDeleteRoundModal={setIsOpenDeleteRoundModal}
      />
      <Toast />
    </>
  )
}

export default Test

export const getStaticProps: GetStaticProps = async () => {
  if (!process.env.NEXT_PUBLIC_END_POINT) {
    throw new Error('End point not defined.')
  }

  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_END_POINT)
  const client = getSdk(graphQLClient)
  const partsName = await client.getAllPartsName()

  if (!partsName.parts) {
    throw new Error('Parts name not found.')
  }

  const partsOptions = partsName.parts

  const exerciseOptions =
    (await client
      .getExerciseNamesByPart({
        partIds: partsOptions[0].id,
      })
      .then((data) => data.part?.exercises)) ?? []

  return {
    props: {
      partsOptions,
      exerciseOptions,
    },
  }
}
