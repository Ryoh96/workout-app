import { forwardRef, useId } from 'react'

import SelectBox from '@/components/atoms/SelectBox'

type Props = {
  label: string
  labelVisible?: boolean
  options: {
    name: string | number
    value: string
    selected?: boolean
  }[]
} & React.ComponentPropsWithoutRef<typeof SelectBox>

const SelectBoxWithLabel = forwardRef<HTMLSelectElement, Props>(
  function SelectBoxWithLabel(
    { label, options, labelVisible = true, ...props },
    ref
  ) {
    const id = useId()
    return (
      <div className="flex items-center mb-2">
        <label
          htmlFor={id}
          className={`text-sm mr-2 ${!labelVisible && 'sr-only'} `}
        >
          {label}
        </label>
        <SelectBox id={id} ref={ref} options={options} {...props} />
      </div>
    )
  }
)

export default SelectBoxWithLabel
