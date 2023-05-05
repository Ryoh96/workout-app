import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & React.ComponentPropsWithoutRef<'button'>

const Button = ({ children }: Props) => {
  return <button className="bg-orange-500">{children}</button>
}

export default Button
