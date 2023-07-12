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
import TrainingList from '@/components/templates/notes/TrainingList'
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
import { ManipulationError } from '@/utils/errors'

type Props = {
  date: string
  partsOptions: ComboBoxOption[]
}

const Note: NextPage<Props> = ({ date: dateString, partsOptions }) => {
  const date = useMemo(() => new Date(dateString), [dateString])
  useCurrentDate(date)

  const {
    data: noteData,
    loading: noteDataLoading,
    refetch,
  } = useGetNoteQuery({
    variables: {
      date: new Date(date).toISOString(),
    },
    onCompleted: (data) => {},
    onError: (error) => {
      if (error instanceof ManipulationError) {
        toast.error(error.message)
        return
      }
      console.error(error)
    },
  })

  const router = useRouter()
  if (noteDataLoading) return <Spinner />
  return <>{console.log(noteData)}</>
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
