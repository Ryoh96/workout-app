import clsx from 'clsx'
import type { ReactNode } from 'react'

export type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props = {
  children: ReactNode
  as: Headings
} & React.ComponentPropsWithoutRef<Headings>

const Title = ({ children, as, className }: Props) => {
  return (
    <>
      {as === 'h1' ? (
        <h1
          className={clsx(
            `font-bold text-transparent text-lg bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600 text-center`,
            className
          )}
        >
          {children}
        </h1>
      ) : as === 'h2' ? (
        <>
          <h2
            className={clsx(
              `text-lg mb-4 pb-2 border-b border-gray-300`,
              className
            )}
          >
            {children}
          </h2>
        </>
      ) : (
        <h3
          className={clsx('text-base font-bold border-b pb-1 mb-3', className)}
        >
          {children}
        </h3>
      )}
    </>
  )
}

export default Title
