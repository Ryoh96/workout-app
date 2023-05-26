import { forwardRef, useId } from 'react'

import SelectBox from '@/components/atoms/SelectBox'

type Props = {
  label: string
  labelPosition?: 'default' | 'top'
  labelVisible?: boolean
  options: {
    name: string | number
    value: string
    selected?: boolean
  }[]
  variant?: 'default' | 'large'
  handleChange?: (id: string) => void
} & React.ComponentPropsWithoutRef<typeof SelectBox>

const SelectBoxWithLabel = forwardRef<HTMLSelectElement, Props>(
  function SelectBoxWithLabel(
    {
      label,
      options,
      variant,
      handleChange,
      labelPosition = 'default',
      labelVisible = true,
      ...props
    },
    ref
  ) {
    const id = useId()
    return (
      <div
        className={`flex items-center mb-2 w-full ${
          labelPosition === 'top' && 'flex-col items-baseline gap-1'
        }`}
      >
        <label
          htmlFor={id}
          className={`text-sm mr-2 text-sky-800 font-bold ${
            !labelVisible && 'sr-only'
          } 
          ${labelPosition === 'top' && 'pl-1'}
          whitespace-nowrap`}
        >
          {label}
        </label>
        <SelectBox
          id={id}
          ref={ref}
          options={options}
          variant={variant}
          handleChange={handleChange}
          {...props}
        />
      </div>
    )
  }
)

export default SelectBoxWithLabel
