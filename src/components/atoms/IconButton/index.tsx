import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  text?: string
} & React.ComponentPropsWithoutRef<'button'>

const IconButton = ({ children, text, ...props }: Props) => {
  return (
    <button
      className="text-orange-600 flex items-center hover:text-orange-400"
      {...props}
    >
      <div>{children}</div>
      <span className="text-sm font-bold">{text && text}</span>
    </button>
  )
}

export default IconButton
