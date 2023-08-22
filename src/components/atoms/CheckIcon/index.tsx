import type { ReactNode } from 'react'
import { forwardRef } from 'react'

type Props = {
  icon: ReactNode
} & React.ComponentPropsWithoutRef<'input'>

const CheckedIcon = forwardRef<HTMLInputElement, Props>(function CheckedIcon(
  { icon, ...props },
  ref
) {
  return (
    <button className="relative w-6 cursor-pointer inline-block">
      <input
        id={props.id}
        type="checkbox"
        {...props}
        ref={ref}
        className="opacity-0 absolute peer z-10 top-0 left-0 w-full h-full cursor-pointer"
      />
      <span
        className="text-gray-400 peer-checked:text-red-500 relative"
        data-testid="icon"
      >
        {icon}
      </span>
    </button>
  )
})

export default CheckedIcon
