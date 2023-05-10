import { forwardRef } from 'react'

type Props = Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'role'>

const Switch = forwardRef<HTMLInputElement, Props>(function Switch(
  { ...props },
  ref
) {
  return (
    <span className="relative inline-block w-12 h-7 rounded-full bg-gray-400">
      <input
        type="checkbox"
        role="switch"
        {...props}
        className="w-full h-full block absolute top-0 left-0 opacity-0 z-10 cursor-pointer peer"
        ref={ref}
      />
      <span className="block w-full h-full absolute top-0 left-0 rounded-full transition duration-75 after:content-[''] after:block after:w-6 after:h-6 after:rounded-full after:absolute after:top-0.5 after:left-0.5 after:shadow after:bg-white after:transition after:duration-75 peer-checked:bg-orange-600 peer-checked:after:translate-x-5" />
    </span>
  )
})

export default Switch
