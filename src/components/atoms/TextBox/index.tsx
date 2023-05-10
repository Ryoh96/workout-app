import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'input'> & {
  isError?: boolean
}

const TextBox = forwardRef<HTMLInputElement, Props>(function TextBox(
  { isError, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`bg-sky-100 text-sm py-2 px-3 rounded w-full ${
        isError && 'bg-red-200 border-2 border-red-800'
      }`}
    />
  )
})

export default TextBox
