import { faChartLine, faChild } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import Toast from '@/components/atoms/Toast'
import Section from '@/components/layouts/Section'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import ExerciseBasicDataSection from '@/components/templates/exercises/ExerciseBasicDataSection'
import ExerciseFooter from '@/components/templates/exercises/ExerciseFooter'
import ExerciseMemoSection from '@/components/templates/exercises/ExerciseMemoSection'
import ExerciseNoteSection from '@/components/templates/exercises/ExerciseNoteSection'
import OrderCountGraph from '@/components/templates/exercises/OrderCountGraph'
import TotalLoadGraph from '@/components/templates/exercises/TotalLoadGraph'
import WeightsGraph from '@/components/templates/exercises/WeightsGraph'
import ChangeExercisePartModal from '@/components/templates/modal/ChangeExercisePartModal'
import RenameExerciseModal from '@/components/templates/modal/RenameExerciseModal'
import { useGetExerciseQuery } from '@/graphql/generated/operations-csr'
import { useTrainingStat } from '@/hooks/pages/exercises/useTrainingStat'
import { ManipulationError } from '@/utils/errors'

type Props = {
  id: string
}

const Exercise: NextPage<Props> = ({ id }) => {
  const {
    data: exerciseData,
    loading: exerciseLoading,
    refetch,
  } = useGetExerciseQuery({
    variables: {
      id,
    },
    onError: (error) => {
      if (error instanceof ManipulationError) toast.error(error.message)
    },
  })

  const [normalizedStatData, statLoading] = useTrainingStat(id)

  const router = useRouter()

  const [isOpenRenameExerciseModal, setIsOpenRenameExerciseModal] =
    useState(false)
  const [isOpenChangePartModal, setIsOpenChangePartModal] = useState(false)

  const dataRef = useRef<HTMLDivElement | null>(null)
  const graphRef = useRef<HTMLDivElement | null>(null)
  const memoRef = useRef<HTMLDivElement | null>(null)
  const noteRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <div className="relative">
        {exerciseLoading ? (
          <Spinner />
        ) : (
          <Title as="h1">{exerciseData?.exercise?.name}</Title>
        )}
        <div className="absolute right-3 top-0 z-20">
          <DropDownWithButton
            icon={<EllipsisHorizontalIcon className="text-white w-6 h-6" />}
            menuItems={[
              {
                icon: <PencilSquareIcon className="text-indigo-800 w-6 h-6" />,
                name: '名前の変更',
                handleClick: () => setIsOpenRenameExerciseModal(true),
              },
              {
                icon: (
                  <FontAwesomeIcon
                    icon={faChild}
                    className="text-indigo-800 w-6 h-6"
                  />
                ),
                name: '部位の変更',
                handleClick: () => {
                  setIsOpenChangePartModal(true)
                },
              },
            ]}
          />
        </div>
        <button
          className="absolute left-3 top-0 z-20"
          onClick={() => router.push('/exercises')}
        >
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-5">
        <ExerciseBasicDataSection
          exerciseData={exerciseData}
          id={id}
          normalizedStatData={normalizedStatData}
          statLoading={statLoading}
          setIsOpenChangePartModal={setIsOpenChangePartModal}
          ref={dataRef}
        />
        <ExerciseMemoSection ref={memoRef} id={id} />
      </div>
      <Section ref={graphRef}>
        <TitleWithIcon
          as="h2"
          icon={<FontAwesomeIcon icon={faChartLine} className="mt-1" />}
        >
          データの推移
        </TitleWithIcon>
        <div className="space-y-2 pb-5">
          <WeightsGraph
            normalizedStatData={normalizedStatData}
            loading={statLoading}
          />
          <TotalLoadGraph
            normalizedStatData={normalizedStatData}
            loading={statLoading}
          />
          <OrderCountGraph id={id} className="pt-5" />
        </div>
      </Section>

      <ExerciseNoteSection
        normalizedData={normalizedStatData}
        ref={noteRef}
        loading={statLoading}
      />
      <ExerciseFooter
        dataRef={dataRef}
        graphRef={graphRef}
        memoRef={memoRef}
        noteRef={noteRef}
      />
      <RenameExerciseModal
        isOpen={isOpenRenameExerciseModal}
        setIsOpen={setIsOpenRenameExerciseModal}
        defaultValue={{ exercise: exerciseData?.exercise?.name }}
        onCompleted={() => refetch({ id })}
        id={id}
      />
      <ChangeExercisePartModal
        isOpen={isOpenChangePartModal}
        setIsOpen={setIsOpenChangePartModal}
        exerciseId={id}
        selected={exerciseData?.exercise?.parts?.[0].id ?? ''}
        onCompleted={() => refetch()}
      />
      <Toast />
    </>
  )
}

export default Exercise

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.query.id as string

  return {
    props: {
      id,
    },
  }
}
