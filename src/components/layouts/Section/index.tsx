import clsx from 'clsx'
import type { ReactNode } from 'react'
import { forwardRef } from 'react'

type Props = {
  children: ReactNode
  variant?: 'default' | 'narrow'
} & React.ComponentPropsWithoutRef<'div'>

const Section = forwardRef<HTMLDivElement, Props>(function Section(
  { children, className, variant = 'default' },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        `bg-white rounded  shadow-md border border-gray-300 ${
          variant === 'default' && 'px-4 pt-4 pb-5 my-4'
        } ${variant === 'narrow' && 'px-1 py-3 -mx-1'}`,
        className
      )}
    >
      {children}
    </div>
  )
})

export default Section
