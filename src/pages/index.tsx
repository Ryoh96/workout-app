import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import Section from '@/components/layouts/Section'
import HorizontalTable from '@/components/molecules/HorizontalTable'
import AccordionList from '@/components/organisms/AccordionList'
import makeRoundsSummary from '@/components/utils/makeRoundsSummary'
import type { GetNotesByDateQuery } from '@/graphql/generated/operations-type'
import { notesByDate } from '@/graphql/schema/queries/getNotesByDate/fixture'

type Props = {
  data: GetNotesByDateQuery
}

const Home: NextPage<Props> = ({ data }) => {
  const normalizedData = data.notes?.map((note) => {
    return {
      title: (note.createdAt as string).slice(0, 10),
      content: (
        <div className="divide-y-2 divide-gray-100 space-y-8">
          <>
            {note.trainings.map((training, index) => (
              <div className="pt-4 first:pt-0" key={index}>
                <HorizontalTable
                  title={training.exercise.name}
                  rounds={makeRoundsSummary(training.rounds)}
                />
              </div>
            ))}
          </>
        </div>
      ),
      tags: Array.from(
        new Set(
          note.trainings.flatMap(
            (training) =>
              training.exercise.parts?.flatMap((part) => part.name) ?? []
          )
        )
      ),
    }
  })

  return (
    <div className="h-full space-y-3 self-start">
      <Title as="h1">Workout App</Title>
      <Section>
        <Title as="h2">ノート管理</Title>
        <p className="pb-2">トレーニングを始めよう!!</p>
        <div className="flex gap-2 justify-center">
          <Link href="/notes/edit">
            <Button variant="important">ノートの追加</Button>
          </Link>
          <Link href="/notes/20230507">
            <Button>ノートを見る</Button>
          </Link>
        </div>
      </Section>
      <Section>
        <Title as="h2">過去30日の記録</Title>
        {normalizedData ? (
          <AccordionList items={normalizedData} />
        ) : (
          <p>記録がありません</p>
        )}
      </Section>
      <Link href="/other" legacyBehavior passHref>
        <a>other</a>
      </Link>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = notesByDate

  return {
    props: {
      data,
    },
  }
}
