import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Section = ({ children }: Props) => {
  return <div className="bg-white rounded p-4 my-4">{children}</div>
}

export default Section
