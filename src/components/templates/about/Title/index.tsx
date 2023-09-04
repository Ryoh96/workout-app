import clsx from 'clsx'
import type { ReactNode } from 'react'

export const Title = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <h1
      className={clsx('text-white text-5xl font-bold text-center', className)}
    >
      {children}
    </h1>
  )
}
