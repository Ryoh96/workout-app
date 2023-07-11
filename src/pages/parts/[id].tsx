import { faChild, faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ChevronLeftIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid'
import { GraphQLClient } from 'graphql-request'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import Toast from '@/components/atoms/Toast'
import Section from '@/components/layouts/Section'
import AddIconButton from '@/components/molecules/AddIconButton'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import ExerciseSummary from '@/components/templates/exercises/ExerciseSummary'
import AddExerciseModal from '@/components/templates/modal/AddExerciseModal'
import ExerciseCountSection from '@/components/templates/part/ExerciseCountSection'
import TotalLoadSection from '@/components/templates/part/TotalLoadSection'
import {
  useGetExerciseNamesByPartLazyQuery,
  useGetExerciseNamesByPartQuery,
  useGetPartNameQuery,
} from '@/graphql/generated/operations-csr'
import { getSdk } from '@/graphql/generated/operations-ssg'
import type { ComboBoxOption } from '@/types'

type Props = {
  id: string
}

const Parts: NextPage<Props> = ({ id }) => {
  const [getExerciseNames, { data: getExerciseNameData, refetch }] =
    useGetExerciseNamesByPartLazyQuery()
  const { data, loading } = useGetPartNameQuery({
    variables: { id },
    onCompleted: (result) => {
      getExerciseNames({ variables: { partIds: result.part?.id as string } })
    },
  })
  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState(false)
  const router = useRouter()
  return (
    <>
      <div className="flex justify-between px-3">
        <button className="" onClick={() => router.push('/exercises')}>
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
        <Title as="h1">部位ごとのデータ</Title>
        <div>
          <DropDownWithButton
            icon={
              <EllipsisHorizontalIcon className="text-white w-6 h-6 hidden" />
            }
            menuItems={[]}
          />
        </div>
      </div>
      {loading ? (
        <Spinner variant="small" />
      ) : (
        <div className="md:flex gap-3">
          <div className="md:w-2/5">
            <Section className="w-full">
              <div className="flex items-center gap-5 relative">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon
                    icon={faChild}
                    className="w-6 h-6 text-indigo-700"
                  />
                  <p className="whitespace-nowrap">
                    {data?.part?.name}のデータ
                  </p>
                </div>
              </div>
            </Section>
            <ExerciseCountSection parts={data?.part as ComboBoxOption} />
          </div>
          <TotalLoadSection
            parts={data?.part as ComboBoxOption}
            className="md:w-3/5"
          />
        </div>
      )}
      <Section>
        <div className="mb-4 relative">
          <TitleWithIcon
            as="h2"
            icon={<FontAwesomeIcon icon={faDumbbell} className="mt-1" />}
          >
            種目一覧
          </TitleWithIcon>
          <div className="absolute right-0 top-1">
            <AddIconButton
              text="種目の追加"
              onClick={() => setIsOpenAddExerciseModal(true)}
            />
          </div>
        </div>
        {getExerciseNameData?.part?.exercises?.length !== 0 ? (
          <div>
            <p className="mb-2 text-sm">
              種目一覧(全{getExerciseNameData?.part?.exercises?.length}件)
            </p>

            <div className="grid gap-x-6  sm:grid-cols-2 lg:grid-cols-3">
              {getExerciseNameData?.part?.exercises?.map((exercise, index) => (
                <div style={{ zIndex: 100 - index }} key={exercise.id}>
                  <ExerciseSummary
                    exercise={exercise}
                    index={index}
                    onCompleted={() =>
                      refetch({ partIds: `${data?.part?.id}` })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm">種目が登録されていません</p>
        )}
      </Section>
      {data && (
        <AddExerciseModal
          isOpen={isOpenAddExerciseModal}
          setIsOpen={setIsOpenAddExerciseModal}
          partsOptions={[data.part] as ComboBoxOption[]}
          parts={data.part as ComboBoxOption}
          onCompleted={() => refetch({ partIds: data.part?.id as string })}
        />
      )}
      <Toast />
    </>
  )
}

export default Parts

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
