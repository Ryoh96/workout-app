import type { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  text?: string
} & React.ComponentPropsWithoutRef<'button'>

const IconButton = ({ icon, text, ...props }: Props) => {
  return (
    <button
      className="text-orange-600 flex items-center hover:text-orange-400 gap-0.5"
      {...props}
    >
      <div data-testid="icon">{icon}</div>
      <span className="text-sm font-bold ">{text}</span>
    </button>
  )
}

export default IconButton
