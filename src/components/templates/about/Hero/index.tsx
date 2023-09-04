import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

import Button from '@/components/atoms/Button'

export const Hero = () => {
  const variants: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
  }

  return (
    <div className="h-[800px] grid justify-center items-center relative">
      <motion.div
        className="text-center px-10 z-10"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={variants}
      >

        <h1 className="mb-10 text-white text-5xl font-bold text-center max-lg:text-4xl leading-[1.5em]" >
          トレーニングを<br className='hidden max-md:block'/>Webで管理しよう
        </h1>
        <p className="text-bold text-white mb-10 text-lg max-sm:text-sm">
          日々のトレーニングを記録して見えるかできるノートアプリ。
        </p>
        <Button variant="important" className="!text-xl max-md:!text-base"
          onClick={() => signIn(undefined, { callbackUrl: "/" })}
        >
          無料で始める
        </Button>
        </motion.div>
        <Image
          src={"/hero.jpg"}
          fill
          alt="hero"
          className='z-0 object-cover'
        />
    </div>
  )
}
