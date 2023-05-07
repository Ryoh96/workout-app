import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  text?: string
}

const IconButton = ({ children, text }: Props) => {
  return (
    <div className="text-orange-600 flex items-center">
      <button>{children}</button>
      <span className='text-sm font-bold'>{text && text}</span>
    </div>
  )
}

export default IconButton
