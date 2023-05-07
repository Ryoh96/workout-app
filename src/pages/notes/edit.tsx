import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import type { NextPage } from 'next'
import { useState } from 'react'

import Button from '@/components/atoms/Button'
import Title from '@/components/atoms/Title'
import Section from '@/components/layouts/Section'
import AddIconButton from '@/components/molecules/AddIconButton'
import ComboBox from '@/components/organisms/ComboBox'
import type { ComboBoxOption } from '@/types'

const places: ComboBoxOption[] = [
  { id: 0, name: '自宅' },
  { id: 1, name: 'ジム' },
]

const parts: ComboBoxOption[] = [
  { id: 0, name: '胸' },
  { id: 1, name: '肩' },
  { id: 2, name: '二頭' },
  { id: 3, name: '三頭' },
  { id: 4, name: '前腕' },
  { id: 5, name: '背中' },
  { id: 6, name: '腹筋' },
  { id: 7, name: '脚' },
  { id: 8, name: '上半身' },
  { id: 9, name: '下半身' },
  { id: 10, name: '全身' },
]

const exercises: ComboBoxOption[] = [
  { id: 0, name: 'ダンベルベンチプレス' },
  { id: 1, name: 'ダンベルフライ' },
  { id: 2, name: 'ディップス' },
  { id: 3, name: 'インクラインダンベルベンチプレス' },
  { id: 4, name: 'プルオーバー' },
]

const EditNote: NextPage = () => {
  const date = new Date()
  const formattedDate = format(date, 'M月d日(E)', { locale: ja })

  const [place, setPlace] = useState<ComboBoxOption>(places[0])
  const [part, setPart] = useState<ComboBoxOption>(parts[0])
  const [exercise, setExercise] = useState<ComboBoxOption>(exercises[0])

  return (
    <>
      <Title as="h1">新規ノート</Title>
      <Section>
        <p className="text-center">{formattedDate.toString()}のノート</p>
      </Section>
      <Section>
        <Title as="h2">基本情報</Title>
        <div className="flex items-center gap-6 mb-6 text-sm">
          <p className="mt-1 whitespace-nowrap">場所:</p>
          <ComboBox
            options={places}
            selected={place}
            setSelected={setPlace}
            variant="small"
          />
          <AddIconButton />
        </div>
      </Section>
      <Section>
        <Title as="h2">トレーニング</Title>
        <div className="flex items-center gap-6 mb-6 text-sm">
          <p className="mt-2 whitespace-nowrap">部位:</p>
          <ComboBox
            options={parts}
            selected={part}
            setSelected={setPart}
            variant="small"
          />
        </div>
        <div className="flex items-center gap-6 mb-6 text-sm">
          <p className="mt-2 whitespace-nowrap">種目名:</p>
          <ComboBox
            options={exercises}
            selected={exercise}
            setSelected={setExercise}
          />
          <AddIconButton />
        </div>
        <div className="text-center mt-4">
          <Button variant="important">トレーニング開始</Button>
        </div>
      </Section>
    </>
  )
}

export default EditNote
