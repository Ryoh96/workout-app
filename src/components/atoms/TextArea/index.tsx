import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

type Props = ComponentPropsWithoutRef<'textarea'> & {
  isError?: boolean
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { isError, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={`bg-sky-100 text-sm py-2 px-3 rounded w-full ${
        isError && 'bg-red-200 border-2 border-red-800'
      }`}
    ></textarea>
  )
})

export default TextArea
