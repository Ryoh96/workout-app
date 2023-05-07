import type { ReactNode } from 'react'

export type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type Props = {
  children: ReactNode
  as: Headings
} & React.ComponentPropsWithoutRef<Headings>

const Title = ({ children, as }: Props) => {
  return (
    <>
      {as === 'h1' ? (
        <h1 className="font-bold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-pink-400 to-orange-600 text-center">
          {children}
        </h1>
      ) : as === 'h2' ? (
        <>
          <h2 className="text-xl mb-4 pb-2 border-b border-gray-300">
            {children}
          </h2>
        </>
      ) : (
        <h3 className="text-2xl pb-4">{children}</h3>
      )}
    </>
  )
}

export default Title
