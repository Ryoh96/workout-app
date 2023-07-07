import type { ReactNode } from 'react'

import type { Headings } from '@/components/atoms/Title'
import Title from '@/components/atoms/Title'

type Props = {
  children: ReactNode
  as: Headings
  icon: ReactNode
} & React.ComponentPropsWithoutRef<Headings>

const TitleWithIcon = ({ children, as, icon }: Props) => {
  return (
    <Title as={as} className="flex items-center gap-2">
      <div className="[&>*]:w-6 [&>*]:h-6  text-indigo-700">{icon}</div>
      <span className="font-bold">{children}</span>
    </Title>
  )
}

export default TitleWithIcon
