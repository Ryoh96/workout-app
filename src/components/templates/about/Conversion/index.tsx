import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

import Button from '@/components/atoms/Button'

export const Conversion = () => {
  const variants = (delay = 0): Variants => {
    return {
      offscreen: {
        opacity: 0,
        y: 100,
      },
      onscreen: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay,
        },
      },
    }
  }

  return (
    <motion.div
      className="py-32 text-center text-white relative"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className='z-10 relative'>
      <motion.h2
        className="text-4xl mb-10 grid leading-[1.2em] font-bold whitespace-nowrap max-xl:text-3xl"
        variants={variants()}
      >
        さあ、ノートを記録しよう
      </motion.h2>
      <motion.div className="leading-7 pb-10">
        <motion.p variants={variants(0.2)}>面倒な登録は不要。</motion.p>
        <motion.p variants={variants(0.4)}>
          Googleアカウントさえあれば始められます。
        </motion.p>
      </motion.div>
      <motion.div variants={variants(0.6)}>
        <Button variant="important" className="!text-xl  max-md:!text-base"
          onClick={() => signIn()}
        >
          無料で始める
        </Button>
      </motion.div>
      </div>
        <Image
          src={"/dumbbell.jpg"}
          fill
          alt="hero"
          className='z-0 object-cover'
        />
    </motion.div>
  )
}
