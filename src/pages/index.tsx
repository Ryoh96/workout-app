import type { NextPage } from 'next'
import Link from 'next/link'
import type { RefObject } from 'react'
import { createRef, useRef, useState } from 'react'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import Section from '@/components/layouts/Section'
import Accordion from '@/components/organisms/Accordion'
import AccordionList from '@/components/organisms/AccordionList'

const data = [
  {
    title: 'accordion1',
    content: (
      <ul>
        <li>content1-1</li>
        <li>content1-2</li>
      </ul>
    ),
  },
  {
    title: 'accordion2',
    content: (
      <ul>
        <li>content2-1</li>
        <li>content2-2</li>
      </ul>
    ),
  },
]

const Home: NextPage = () => {
  return (
    <div className="h-full space-y-3 self-start">
      <Section>
        <Title as="h1">Workout App</Title>
        <p className="pb-2">トレーニングを始めよう!!</p>
        <div className="grid gap-2">
          <Button variant="important">ノートの追加</Button>
          <Button>ノートを見る</Button>
        </div>
      </Section>
      <Section>
        <Title as="h2">過去30日の記録</Title>
        <AccordionList items={data} />
      </Section>
      <Link href="/other" legacyBehavior passHref>
        <a>other</a>
      </Link>
    </div>
  )
}

export default Home
