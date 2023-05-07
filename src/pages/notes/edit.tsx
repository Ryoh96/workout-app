import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import type { NextPage } from 'next'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import Section from '@/components/layouts/Section'

const EditNote: NextPage = () => {
  const date = new Date()
  const formattedDate = format(date, 'M月d日(E)', { locale: ja })
  return (
    <>
      <Title as="h1">新規ノート</Title>
      <Section>
        <p className="text-center">{formattedDate.toString()}のノート</p>
      </Section>
      <Section>
        <Title as="h2">基本情報</Title>
        <p>場所:</p>
        <p>部位:</p>
      </Section>
      <Section>
        <Title as="h2">トレーニング</Title>
        <p>部位:</p>
        <p>種目名:</p>
        <div className="text-center mt-4">
          <Button variant="important">トレーニング開始</Button>
        </div>
      </Section>
    </>
  )
}

export default EditNote
