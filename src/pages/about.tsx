import type { ReactElement } from 'react'

import { AboutLayout } from '@/components/layouts/About'
import { Conversion } from '@/components/templates/about/Conversion'
import { Section } from '@/components/templates/about/Section'

import type { NextPageWithLayout } from './_app'

const About: NextPageWithLayout = () => {
  return (
    <>
      <Section
        title={
          <>
            <span>重量・回数・セット数から</span>
            <span>総負荷量を自動で記録</span>
          </>
        }
        desc={
          <>
            <p>&nbsp;&nbsp;必要な入力項目は非常にシンプル。</p>
            <p>
              &nbsp;&nbsp;総負荷量が部位別、種目別に自動で算出されるので、トレーニングの結果がわかりやすく数値化できます。
            </p>
            <p>&nbsp;&nbsp;更に、紙のノートのように自由にメモを残すことも可能です。</p>
          </>
        }
        url="/demo1.png"
      />
      <Section
        direction="reverse"
        bgColor="orange"
        title={
          <>
            <span>ノートをめくる操作は不要</span>
            <span>過去の記録も簡単に見ることが可能</span>
          </>
        }
        desc={
          <>
            <p>&nbsp;&nbsp;ノートを遡らなくても、同じ種目の過去のデータが参照可能。</p>
            <p>
              &nbsp;&nbsp;行いたい種目の現在までのデータを見返して、今日の重量を決めよう。
            </p>
          </>
        }
        url="/demo2.png"
      />
      <Section
        bgColor="white"
        title={
          <>
            <span>ノートをグラフで見える化</span>
            <span>モチベーションアップに繋げよう</span>
          </>
        }
        desc={
          <>
            <p>&nbsp;&nbsp;入力したデータは種目ごと、部位ごとにグラフで閲覧可能。</p>
            <p>
              &nbsp;&nbsp;期間やセット数なども変更でき、欲しいデータだけ見ることも可能です。
            </p>
          </>
        }
        url="/demo3.png"
        type="screen"
      />
      <Conversion />
    </>
  )
}

About.getLayout = function getLayout(page: ReactElement) {
  return <AboutLayout>{page}</AboutLayout>
}

export default About
