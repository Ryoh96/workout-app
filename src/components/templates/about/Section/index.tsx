import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import type { ReactNode } from 'react'

type Props = {
  direction?: 'default' | 'reverse'
  bgColor?: 'default' | 'orange' | 'white'
  title: ReactNode
  desc: ReactNode
  url: string
  type?: "screen" | "default"
}
export const Section = ({
  title,
  desc,
  url,
  direction = 'default',
  bgColor = 'default',
  type = "default" 
}: Props) => {
  const imageVariants: Variants = {
    offscreen: {
      opacity: 0,
      y: 100,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.7,
        type: 'spring',
      },
    },
  }

  const titleVariants: Variants = {
    offscreen: {
      x: -150,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  const textVariants: Variants = {
    offscreen: {
      x: 50,
      opacity: 0,
    },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        type: 'tween',
      },
    },
  }

  return (
    <div
      className={`
      ${
        bgColor === 'default' &&
        'bg-gradient-to-r from-black to-slate-700 text-white'
      } 
      ${
        bgColor === 'orange' &&
        'bg-gradient-to-r  from-orange-400 to-red-500 text-black'
      }
      ${
        bgColor === 'white' &&
        'bg-gradient-to-r  from-slate-100 to-slate-300 text-black'
      }
         py-10
      `}
    >
      <motion.div
        className={`flex gap-10 justify-between w-full items-center ${
          direction === 'reverse' && 'flex-row-reverse'
        }
        max-w-[1125px] mx-auto
        px-10
        max-md:flex-col
      `}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.div className="py-32 max-md:py-12">
          <motion.h2
            className="text-4xl mb-10 grid leading-[1.2em] font-bold  max-xl:text-3xl  max-md:text-center"
            variants={titleVariants}
          >
            {title}
          </motion.h2>
          <motion.div className="leading-7 max-sm:text-sm max-md:w-[85%] mx-auto" variants={textVariants}>
            {desc}
          </motion.div>
        </motion.div>
        <motion.div className={`${type === "default" && "w-20"} ${type === "screen" && "w-50"} min-w-[320px] max-md:mx-auto relative  overflow-hidden`} variants={imageVariants}>
          <Image
            width={540}
            height={600}
            alt="demo"
            src={url}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
