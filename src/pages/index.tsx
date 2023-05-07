import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

import Button from '@/components/atoms/Button'
import HorizontalTable from '@/components/atoms/HorizontalTable'
import Title from '@/components/atoms/Title'
import Section from '@/components/layouts/Section'
import AccordionList from '@/components/organisms/AccordionList'
import makeRoundsSummary from '@/components/utils/makeRoundsSummary'
import type { GetNotesByDateQuery } from '@/graphql/generated/operations-type'
import { notesByDate } from '@/graphql/schema/queries/getNotesByDate/fixture'

const items = [
  {
    title: '8月31日(火)',
    content: (
      <ul>
        <li>content1-1</li>
        <li>content1-2</li>
      </ul>
    ),
  },
  {
    title: '8月30日(月)',
    content: (
      <ul>
        <li>content2-1</li>
        <li>content2-2</li>
      </ul>
    ),
  },
]

type Props = {
  data: GetNotesByDateQuery
}

const Home: NextPage<Props> = ({ data }) => {
  const normalizedData = data.notes?.map((note) => {
    return {
      title: note.createdAt as string,
      content: (
        <div className="divide-y-2 divide-gray-100 space-y-8">
          <>
            {note.trainings.map((training, index) => (
              <div className="pt-4 first:pt-0" key={index}>
                <HorizontalTable
                  title={training.exercise.name}
                  array={makeRoundsSummary(training.rounds)}
                />
              </div>
            ))}
          </>
        </div>
      ),
    }
  })
  return (
    <div className="h-full space-y-3 self-start">
      <Title as="h1">Workout App</Title>
      <Section>
        <Title as="h2">ノート管理</Title>
        <p className="pb-2">トレーニングを始めよう!!</p>
        <div className="grid gap-2">
          <Link href="/notes/edit">
            <Button variant="important">ノートの追加</Button>
          </Link>
          <Button>ノートを見る</Button>
        </div>
      </Section>
      <Section>
        <Title as="h2">過去30日の記録</Title>
        {data ? (
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
