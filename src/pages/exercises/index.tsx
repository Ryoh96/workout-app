import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

import Title from '@/components/atoms/Title'
import Section from '@/components/layouts/Section'
import ComboBox from '@/components/organisms/ComboBox'
import type { GetAllExercisesMaxQuery } from '@/graphql/generated/operations-type'
import { allExercisesMax } from '@/graphql/schema/queries/getAllExercisesMax/fixture'
import type { ComboBoxOption } from '@/types'

const options = [
  { id: 0, name: '全て' },
  { id: 1, name: '胸' },
  { id: 2, name: '二頭' },
] as ComboBoxOption[]

type Props = {
  data: GetAllExercisesMaxQuery
}

const Exercises: NextPage<Props> = ({ data }) => {
  const [part, setPart] = useState<ComboBoxOption>(options[0])
  return (
    <>
      <Title as="h1">登録種目一覧</Title>
      <Section>
        <div className="flex items-center gap-5 border-b-2 pb-3 mb-3">
          <p className="whitespace-nowrap text-sm mt-2">部位:</p>
          <ComboBox selected={part} setSelected={setPart} options={options} />
        </div>
        {data.exercises?.map((exercise) => (
          <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
            <div className="text-sm mb-3 border-2 rounded shadow-md p-2 flex items-center justify-between">
              <div>
                <p className="font-bold mb-1">{exercise.name}</p>
                <div>
                  <p>
                    最大重量: {exercise.maxWeight}kg (更新日:
                    {exercise.updatedAt})
                  </p>
                  <p>
                    最大層負荷量: {exercise.maxTotalLoad} (更新日:
                    {exercise.updatedAt})
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-sky-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </Link>
        ))}
      </Section>
    </>
  )
}

export default Exercises

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = allExercisesMax
  return {
    props: {
      data,
    },
  }
}
