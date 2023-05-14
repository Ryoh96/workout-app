import { forwardRef } from 'react'

type Props = {
  options: {
    name: string | number
    value: string
  }[]
  selected?: string
  variant?: 'default' | 'large'
} & React.ComponentPropsWithoutRef<'select'>

const SelectBox = forwardRef<HTMLSelectElement, Props>(function SelectBox(
  { options, selected, variant = 'default', ...props },
  ref
) {
  return (
    <div className={`relative w-14 ${variant === 'large' && 'w-full'}`}>
      <select
        {...props}
        ref={ref}
        className={`border p-1 w-full appearance-none rounded pl-2 text-sm `}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            selected={option.value === selected}
          >
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 bg-orange-400 h-full grid place-items-center rounded pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  )
})

export default SelectBox
