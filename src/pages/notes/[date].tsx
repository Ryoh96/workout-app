import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'
import { toast } from 'react-toastify'

import Button from '@/components/atoms/Button'
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
import TrainingList from '@/components/templates/notes/TrainingList'
import TrainingsDataSection from '@/components/templates/notes/TrainingsDataSection'
import TrainingsMemoSection from '@/components/templates/notes/TrainingsMemoSection'
import { useGetAllPartsNameQuery } from '@/graphql/generated/operations-csr'
import useCurrentDate from '@/hooks/common/useCurrentDate'
import { useCreateNote } from '@/hooks/pages/note/useCreateNote'
import { useGetNote } from '@/hooks/pages/note/useGetNote'
import useDeleteNoteModalStore from '@/store/modal/deleteNoteModal'
import useNoteIdStore from '@/store/note/noteId'
import useLastTrainingIdStore from '@/store/training/lastTrainingId'
import { datetimeFormat } from '@/utils/dateFormat'
import { ManipulationError } from '@/utils/errors'

type Props = {
  date: string
}

const Note: NextPage<Props> = ({ date: dateString }) => {
  const { status } = useSession()
  const date = useMemo(() => new Date(dateString), [dateString])
  useCurrentDate(date)
  const { noteId, setNoteId } = useNoteIdStore((state) => ({
    noteId: state.noteId,
    setNoteId: state.setNoteId,
  }))
  const lastTrainingId = useLastTrainingIdStore((state) => state.lastTrainingId)
  const setIsOpenDeleteNoteModal = useDeleteNoteModalStore(
    (state) => state.setIsOpen
  )
  const { data: partsData, loading: partsLoading } = useGetAllPartsNameQuery()
  const [noteData, noteDataLoading, refetch] = useGetNote(date, setNoteId)
  const { handleCreateNote, createNoteLoading } = useCreateNote(setNoteId, () =>
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
        <div className="z-50" data-testid="noteMenu">
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
      {!noteId && (
        <div className="w-full flex justify-center items-start">
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
                    pending: 'ノート作成中',
                  },
                  {
                    autoClose: 3000,
                  }
                )
              } catch (error) {
                console.error(error)
              }
            }}
            loading={
              noteDataLoading || createNoteLoading || status === 'loading'
            }
          >
            ノートを作成
          </Button>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-x-2 md:h-screen">
        <div className="md:overflow-y-auto">
          {noteData?.note && (
            <SummarySection
              noteData={noteData}
              className="md:hidden"
              datetime={datetimeFormat(
                new Date(noteData?.note.createdAt),
                true
              )}
            />
          )}
          {noteId &&
            noteData?.note?.trainings?.length !== 0 &&
            !noteDataLoading && (
              <TrainingList
                noteData={noteData}
                onCompleted={() => refetch({ date: date.toISOString() })}
              />
            )}
          {!partsLoading &&
            (lastTrainingId === null ||
              noteData?.note?.trainings?.length === 0) &&
            noteId && (
              <CreateTraining
                onCompleted={() => refetch({ date: date.toISOString() })}
                partsOptions={partsData!.parts ?? []}
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

        {noteId && (
          <div className="hidden md:block md:overflow-y-auto">
            <TrainingsDataSection noteData={noteData} />
            <TrainingsMemoSection />
          </div>
        )}
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
  return {
    props: {
      date,
    },
  }
}
