import { forwardRef } from 'react'

type Props = {
  options: {
    name: string | number
    value: string
  }[]
  variant?: 'default' | 'large' | 'middle'
  handleChange?: (id: string) => void
} & React.ComponentPropsWithoutRef<'select'>

const SelectBox = forwardRef<HTMLSelectElement, Props>(function SelectBox(
  { options, handleChange, variant = 'default', ...props },
  ref
) {
  return (
    <div
      className={`relative w-14  shadow-md ${variant === 'large' && 'w-full'} ${
        variant === 'middle' && 'w-24'
      }`}
    >
      <select
        {...props}
        ref={ref}
        className={`border p-1 w-full appearance-none rounded text-xs h-full py-2 pl-3 ${
          variant === 'middle' && 'pt-1 pb-1'
        }`}
        onChange={(e) => handleChange?.(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value} className="text-xs">
            {option.name}
          </option>
        ))}
      </select>
      <div
        className={`absolute top-1/2 -translate-y-1/2 right-0 bg-orange-400 h-full grid place-items-center rounded pointer-events-none  ${
          variant === 'large' && 'px-1.5'
        } `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-orange-900"
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
