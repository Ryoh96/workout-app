import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { GraphQLClient } from 'graphql-request'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import Button from '@/components/atoms/Button'
import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import Toast from '@/components/atoms/Toast'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import { DeleteNoteModal } from '@/components/templates/modal/DeleteModal/DeleteNoteModal'
import { DeleteRoundModal } from '@/components/templates/modal/DeleteModal/DeleteRoundModal'
import { DeleteTrainingModal } from '@/components/templates/modal/DeleteModal/DeleteTrainingModal'
import EditRoundModal from '@/components/templates/modal/EditRoundModal'
import CreateTraining from '@/components/templates/notes/CreateTraining'
import SummarySection from '@/components/templates/notes/SummarySection'
import TrainingFooter from '@/components/templates/notes/TrainingFooter'
import TrainingHeader from '@/components/templates/notes/TrainingHeader'
import TrainingList  from '@/components/templates/notes/TrainingList'
import TrainingsDataSection from '@/components/templates/notes/TrainingsDataSection'
import TrainingsMemoSection from '@/components/templates/notes/TrainingsMemoSection'
import { useGetNoteQuery } from '@/graphql/generated/operations-csr'
import { getSdk } from '@/graphql/generated/operations-ssg'
import useCurrentDate from '@/hooks/common/useCurrentDate'
import { useCreateNote } from '@/hooks/pages/editNote/useCreateNote'
import { deleteNoteModalState } from '@/recoil/Modal/DeleteNoteModal'
import { noteIdState } from '@/recoil/Note/noteId'
import { lastTrainingIdState } from '@/recoil/Training/lastTrainingId'
import type { ComboBoxOption } from '@/types'
import { datetimeFormat } from '@/utils/dateFormat'

type Props = {
  date: string
  partsOptions: ComboBoxOption[]
}

const Note: NextPage<Props> = ({ date: dateString, partsOptions }) => {
  const date = useMemo(() => new Date(dateString), [dateString])
  useCurrentDate(date)

  const [noteId, setNoteId] = useRecoilState(noteIdState)
  const lastTrainingId = useRecoilValue(lastTrainingIdState)
  const setIsOpenDeleteNoteModal = useSetRecoilState(deleteNoteModalState)

  const {
    data: noteData,
    loading: noteDataLoading,
    refetch,
  } = useGetNoteQuery({
    variables: {
      date: new Date(date).toISOString(),
    },
    onCompleted: (data) => {
      setNoteId(data.note?.id ?? null)
    },
  })

  const handleCreateNote = useCreateNote(setNoteId, () =>
    refetch({ date: date.toISOString() })
  )
  const router = useRouter()

  return (
    <>
      <div className="flex justify-between px-3">
        <button className="" onClick={() => router.push('/')}>
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
        <Title as="h1">ノート</Title>
        <div className="z-50">
          <DropDownWithButton
            icon={<EllipsisHorizontalIcon className="text-white w-6 h-6" />}
            menuItems={[
              {
                icon: <PencilIcon className="text-indigo-800 w-6 h-6" />,
                name: '今日のノート',
                handleClick: () => {
                  router.push(`/notes/${format(new Date(), 'yyyy-MM-dd')}`)
                },
              },
              {
                icon: <TrashIcon className="text-indigo-800 w-6 h-6" />,
                name: 'ノートの削除',
                handleClick: () => {
                  if (noteId === null) {
                    toast.error('ノートがありません')
                    return
                  }
                  setIsOpenDeleteNoteModal(true)
                },
              },
            ]}
          />
        </div>
      </div>
      <TrainingHeader />
      <div className="grid md:grid-cols-2 gap-x-2 md:h-screen">
        <div className="md:overflow-y-auto">
          {noteDataLoading ? (
            <Spinner />
          ) : (
            noteData?.note && (
              <SummarySection
                noteData={noteData}
                className="md:hidden"
                datetime={datetimeFormat(
                  new Date(noteData?.note.createdAt),
                  true
                )}
              />
            )
          )}
          {!noteId ? (
            <div className="flex justify-center">
              <Button
                variant="important"
                onClick={async () => {
                  try {
                    await toast.promise(
                      handleCreateNote(),
                      {
                        error: {
                          render({ data }) {
                            //@ts-ignore
                            return `${data.message}`
                          },
                        },
                        success: 'ノート作成完了',
                        pending: "ノート作成中",
                      },
                      {
                        autoClose: 3000,
                      }
                    )
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                ノートを作成
              </Button>
            </div>
          ) : (
            noteData?.note?.trainings?.length !== 0 && (
              <TrainingList
                noteData={noteData}
                onCompleted={() => refetch({ date: date.toISOString() })}
              />
            )
          )}
          {(lastTrainingId === null ||
            noteData?.note?.trainings?.length === 0) &&
            noteId && (
              <CreateTraining
                onCompleted={() => refetch({ date: date.toISOString() })}
                partsOptions={partsOptions ?? []}
                existingTrainings={
                  new Set(
                    noteData?.note?.trainings?.map(
                      (training) => training.exercise?.id
                    )
                  )
                }
              />
            )}
        </div>
        <div className="hidden md:block md:overflow-y-auto">
          <TrainingsDataSection noteData={noteData} />
          <TrainingsMemoSection />
        </div>
      </div>
      <TrainingFooter noteData={noteData} className="md:hidden" />
      <EditRoundModal
        onCompleted={() => refetch({ date: date.toISOString() })}
      />
      <DeleteTrainingModal
        onDeleteCompleted={() => refetch({ date: date.toISOString() })}
      />
      <DeleteRoundModal
        onDeleteCompleted={() => refetch({ date: date.toISOString() })}
      />
      <DeleteNoteModal
        onDeleteCompleted={() => {
          setNoteId(null)
          refetch()
        }}
      />
      <Toast />
    </>
  )
}

export default Note

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { date } = context.query

  const dateString = `${date}`
  const regex = /^\d{4}-\d{2}-\d{2}$/
  const isValidFormat = regex.test(dateString)

  if (!isValidFormat) {
    return {
      notFound: true,
    }
  }

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

  return {
    props: {
      date,
      partsOptions,
    },
  }
}
