import { faChild, faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { GraphQLClient } from 'graphql-request'
import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Spinner from '@/components/atoms/Spinner'
import Title from '@/components/atoms/Title'
import Toast from '@/components/atoms/Toast'
import Section from '@/components/layouts/Section'
import SelectBoxWithLabel from '@/components/molecules/SelectBoxWithLabel'
import TitleWithIcon from '@/components/molecules/TitleWithIcon'
import DropDownWithButton from '@/components/organisms/DropDownWithButton'
import ExerciseSummary from '@/components/templates/exercises/ExerciseSummary'
import AddExerciseModal from '@/components/templates/modal/AddExerciseModal'
import { useGetExerciseNamesByPartLazyQuery } from '@/graphql/generated/operations-csr'
import { getSdk } from '@/graphql/generated/operations-ssg'
import type { ComboBoxOption } from '@/types'

type Props = {
  partsOptions: ComboBoxOption[]
}

const Exercises: NextPage<Props> = ({ partsOptions }) => {
  const [parts, setParts] = useState<ComboBoxOption>(partsOptions[0])

  const [getExerciseName, { data: getExerciseNameData, loading, refetch }] =
    useGetExerciseNamesByPartLazyQuery({
      onError: (error) => toast.error(error.message),
    })

  const handleChange = async (id: string) => {
    try {
      const part = partsOptions.find((part) => part.id === id)
      if (!part) throw new Error('Part not found')
      setParts(part)
      await refetch({
        partIds: `${id}`,
      })
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.error(error)
      }
    }
  }
  const [isOpenAddExerciseModal, setIsOpenAddExerciseModal] = useState(false)
  useEffect(() => {
    getExerciseName({
      variables: {
        partIds: `${parts.id}`,
      },
    })
  }, [])
  const router = useRouter()
  return (
    <>
      <div className="flex justify-between px-3">
        <button className="" onClick={() => router.push('/')}>
          <ChevronLeftIcon className="text-white w-6 h-6" />
        </button>
        <Title as="h1">登録種目一覧</Title>
        <div>
          <DropDownWithButton
            icon={
              <EllipsisHorizontalIcon className="text-white w-6 h-6 hidden" />
            }
            menuItems={[]}
          />
        </div>
      </div>
      <div className="md:flex gap-3">
        <Section className="w-full ">
          <div className="flex items-center gap-5 relative">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon
                icon={faChild}
                className="w-6 h-6 text-indigo-700"
              />
              <p className="whitespace-nowrap">部位を選択:</p>
            </div>
            <div className="w-full flex items-center gap-2">
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
            <div className="z-50">
              <DropDownWithButton
                icon={
                  <EllipsisHorizontalIcon className="text-indigo-800 w-6 h-6" />
                }
                menuItems={[
                  {
                    icon: (
                      <MagnifyingGlassIcon className="text-indigo-800 w-6 h-6" />
                    ),
                    name: 'この部位のデータ',
                    handleClick: () => router.push(`/parts/${parts.id}`),
                  },
                  {
                    icon: <PlusIcon className="text-indigo-800 w-6 h-6" />,
                    name: '種目の追加',
                    handleClick: () => setIsOpenAddExerciseModal(true),
                  },
                ]}
              />
            </div>
          </div>
        </Section>
      </div>
      <Section>
        <div className="mb-4 relative">
          <TitleWithIcon
            as="h2"
            icon={<FontAwesomeIcon icon={faDumbbell} className="mt-1" />}
          >
            種目一覧
          </TitleWithIcon>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {getExerciseNameData?.part?.exercises?.length !== 0 ? (
              <div>
                <p className="mb-3 text-sm ml-2">
                  種目一覧(全{getExerciseNameData?.part?.exercises?.length}件)
                </p>

                <div className="grid gap-x-6  sm:grid-cols-2 lg:grid-cols-3">
                  {getExerciseNameData?.part?.exercises?.map(
                    (exercise, index) => (
                      <div style={{ zIndex: 100 - index }} key={exercise.id}>
                        <ExerciseSummary
                          exercise={exercise}
                          index={index}
                          onCompleted={() =>
                            refetch({ partIds: `${parts.id}` })
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <p>種目が登録されていません</p>
            )}
          </>
        )}
      </Section>
      <AddExerciseModal
        isOpen={isOpenAddExerciseModal}
        setIsOpen={setIsOpenAddExerciseModal}
        partsOptions={partsOptions}
        parts={parts}
        onCompleted={() => refetch({ partIds: parts.id as string })}
      />
      <Toast />
    </>
  )
}

export default Exercises

export const getServerSideProps: GetServerSideProps<Props> = async () => {
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
      partsOptions,
    },
  }
}
