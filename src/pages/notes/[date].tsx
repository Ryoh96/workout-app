import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Tag from '@/components/atoms/Tag'
import Title from '@/components/atoms/Title'
import Section from '@/components/layouts/Section'
import HorizontalTable from '@/components/molecules/HorizontalTable'
import type { GetNoteQuery, Round } from '@/graphql/generated/operations-type'
import { note } from '@/graphql/schema/queries/getNote/fixture'
import makeRoundsSummary from '@/utils/makeRoundsSummary'

type Props = {
  data: GetNoteQuery
}

const Note: NextPage<Props> = ({ data }: Props) => {
  return (
    <>
      <Title as="h1">今までのノート</Title>
      <Section>{data.note?.createdAt}のノート</Section>
      <Section>
        <div className="flex items-center gap-6 mb-6 text-sm">
          <p className="whitespace-nowrap">場所:</p>
          <p>{data.note?.place.name ?? '--'}</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <p className="whitespace-nowrap">部位:</p>
          {Array.from(
            new Set(
              data.note?.trainings.flatMap((training) =>
                training.exercise.parts?.flatMap((part) => part.name ?? [])
              )
            )
          ).map((part, index) => part && <Tag key={index}>{part}</Tag>)}
        </div>
      </Section>
      {data.note?.trainings.map((training, index) => (
        <Section key={index}>
          <div className="border-b border-gray-300 pb-2 mb-2 flex items-center gap-3">
            <p>
              {index + 1}. {training.exercise.name}
            </p>
            {training.exercise.parts?.map((part, index) => (
              <Tag key={index}>{part.name}</Tag>
            ))}
          </div>
          <HorizontalTable
            rounds={makeRoundsSummary(training.rounds as Round[])}
          />
        </Section>
      ))}
    </>
  )
}

export default Note

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/notes/20230507'],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = note

  return {
    props: {
      data,
    },
  }
}
